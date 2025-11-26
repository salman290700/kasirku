SELECT *
  FROM your_table
  ORDER BY id
  LIMIT page_size OFFSET (page_number - 1) * page_size;