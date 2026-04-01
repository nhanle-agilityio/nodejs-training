-- Order header + delivery address
SELECT o.id,
       o.purchase_total,
       o.tax_amount,
       o.total,
       o.status,
       a.house_no,
       a.street,
       a.city,
       a.phone,
       a.special_note
FROM orders o
JOIN addresses a ON o.address_id = a.id
WHERE o.id = $1;
