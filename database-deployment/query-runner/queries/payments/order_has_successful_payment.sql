-- Whether an order has at least one successful payment
SELECT EXISTS (
  SELECT 1
  FROM payments
  WHERE order_id = $1
    AND status = 'successful'
) AS exists;
