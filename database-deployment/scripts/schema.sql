-- ============================================================
-- Users & Authentication
-- ============================================================

CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  NOT NULL UNIQUE,
    password      VARCHAR(255),
    phone         VARCHAR(20),
    date_of_birth DATE,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE social_accounts (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider      VARCHAR(20)   NOT NULL,
    client_id     VARCHAR(255),
    client_secret VARCHAR(255),
    access_token  VARCHAR(255),
    refresh_token VARCHAR(255),
    expires_at    DATE,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, provider)
);

-- ============================================================
-- Addresses
-- ============================================================

CREATE TABLE addresses (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    house_no     VARCHAR(100),
    street       VARCHAR(100),
    city         VARCHAR(100),
    phone        VARCHAR(20),
    special_note VARCHAR(255),
    is_default   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Menu & Catalog
-- ============================================================

CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)  NOT NULL UNIQUE,
    description VARCHAR(255),
    image_url   VARCHAR(255),
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE dish_items (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(255)  NOT NULL,
    description    VARCHAR(255),
    image_url      VARCHAR(255),
    price          DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category_id    UUID          NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    is_best_seller BOOLEAN       NOT NULL DEFAULT FALSE,
    avg_rating     DECIMAL(2,1)  NOT NULL DEFAULT 0.0 CHECK (avg_rating >= 0.0 AND avg_rating <= 5.0),
    total_ratings  INTEGER       NOT NULL DEFAULT 0 CHECK (total_ratings >= 0),
    like_count     INTEGER       NOT NULL DEFAULT 0 CHECK (like_count >= 0),
    is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE ingredients (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name      VARCHAR(255)  NOT NULL UNIQUE,
    image_url VARCHAR(255)
);

CREATE TABLE dish_ingredients (
    dish_id       UUID NOT NULL REFERENCES dish_items(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    PRIMARY KEY (dish_id, ingredient_id)
);

-- ============================================================
-- Combos & Meal Plans
-- ============================================================

CREATE TABLE combos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)  NOT NULL,
    description VARCHAR(255),
    price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url   VARCHAR(255),
    is_active   BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE combo_items (
    combo_id UUID    NOT NULL REFERENCES combos(id) ON DELETE CASCADE,
    dish_id  UUID    NOT NULL REFERENCES dish_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    PRIMARY KEY (combo_id, dish_id)
);

CREATE TABLE meal_plans (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)  NOT NULL,
    description VARCHAR(255),
    price       DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    is_active   BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE meal_plan_details (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_plan_id UUID         NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    description  VARCHAR(255) NOT NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Cart
-- ============================================================

CREATE TABLE carts (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id    UUID          NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    dish_id    UUID          NOT NULL REFERENCES dish_items(id) ON DELETE RESTRICT,
    quantity   INTEGER       NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Vouchers & Discounts
-- ============================================================

CREATE TABLE vouchers (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code           VARCHAR(50)   NOT NULL UNIQUE,
    discount_type  VARCHAR(20)   NOT NULL CHECK (discount_type IN ('fixed', 'percentage')),
    discount_value DECIMAL(10,2) NOT NULL,
    max_uses       INTEGER,
    usage_count    INTEGER       NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
    expiry         TIMESTAMPTZ,
    is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE discounts (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(255)  NOT NULL,
    description    VARCHAR(255),
    discount_value DECIMAL(10,2) NOT NULL,
    is_active      BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Orders & Payments
-- ============================================================

CREATE TABLE orders (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID          NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    address_id     UUID          NOT NULL REFERENCES addresses(id) ON DELETE RESTRICT,
    purchase_total DECIMAL(10,2) NOT NULL,
    voucher_id     UUID          REFERENCES vouchers(id) ON DELETE SET NULL,
    discount_id    UUID          REFERENCES discounts(id) ON DELETE SET NULL,
    tax_amount     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total          DECIMAL(10,2) NOT NULL,
    status         VARCHAR(20)   NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'confirmed', 'preparing', 'in_transit', 'delivered', 'cancelled')),
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id   UUID          NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    dish_id    UUID          NOT NULL REFERENCES dish_items(id) ON DELETE RESTRICT,
    quantity   INTEGER       NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id       UUID          NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
    amount         DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20)   NOT NULL,
    transaction_id VARCHAR(255)  UNIQUE,
    client_secret  VARCHAR(255),
    status         VARCHAR(20)   NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'successful', 'failed')),
    card_number    VARCHAR(20),
    card_expiry    TIMESTAMPTZ,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Reviews & Engagement
-- ============================================================

CREATE TABLE reviews (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dish_id    UUID        NOT NULL REFERENCES dish_items(id) ON DELETE CASCADE,
    rating     INTEGER     NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text       TEXT,
    date       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, dish_id)
);

CREATE TABLE wishlist (
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dish_id    UUID NOT NULL REFERENCES dish_items(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, dish_id)
);

CREATE TABLE user_likes (
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dish_id    UUID NOT NULL REFERENCES dish_items(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, dish_id)
);

-- ============================================================
-- Loyalty Program
-- ============================================================

CREATE TABLE loyalty_accounts (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    current_points INTEGER     NOT NULL DEFAULT 0 CHECK (current_points >= 0),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE points_rules (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    points_required INTEGER       NOT NULL CHECK (points_required > 0),
    discount_value  DECIMAL(10,2) NOT NULL,
    is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE loyalty_transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    type            VARCHAR(10) NOT NULL CHECK (type IN ('earn', 'redeem')),
    points_amount   INTEGER     NOT NULL CHECK (points_amount > 0),
    order_id        UUID        REFERENCES orders(id) ON DELETE SET NULL,
    voucher_id      UUID        REFERENCES vouchers(id) ON DELETE SET NULL,
    points_rule_id  UUID        REFERENCES points_rules(id) ON DELETE SET NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_dish_items_category_id ON dish_items(category_id);
CREATE INDEX idx_dish_ingredients_ingredient_id ON dish_ingredients(ingredient_id);
CREATE INDEX idx_combo_items_dish_id ON combo_items(dish_id);
CREATE INDEX idx_meal_plan_details_meal_plan_id ON meal_plan_details(meal_plan_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_dish_id ON cart_items(dish_id);
CREATE INDEX idx_orders_address_id ON orders(address_id);
CREATE INDEX idx_orders_voucher_id ON orders(voucher_id);
CREATE INDEX idx_orders_discount_id ON orders(discount_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_dish_id ON order_items(dish_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_reviews_dish_id ON reviews(dish_id);
CREATE INDEX idx_wishlist_dish_id ON wishlist(dish_id);
CREATE INDEX idx_user_likes_dish_id ON user_likes(dish_id);
CREATE INDEX idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_order_id ON loyalty_transactions(order_id) WHERE order_id IS NOT NULL;
