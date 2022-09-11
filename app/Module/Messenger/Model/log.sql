SELECT message.session_id, GROUP_CONCAT( DISTINCT message.user_id ) as users, COUNT( message.id ) AS total_message, COUNT( CASE WHEN message.is_seen = 0 THEN 1 ELSE NULL END ) AS total_unread, message.updated_on, GROUP_CONCAT( DISTINCT wp_wpwax_cs_session_term_relationships.term_taxonomy_id ) as terms, GROUP_CONCAT( DISTINCT CASE WHEN message.is_seen = 0 THEN message.id ELSE NULL END ) as unread_messages, COUNT( CASE WHEN message.user_id = 1 THEN 1 ELSE NULL END ) as my_message_count FROM ( SELECT wp_wpwax_cs_messages.*, wp_wpwax_cs_messages_seen_by.message_id, GROUP_CONCAT( DISTINCT wp_wpwax_cs_messages_seen_by.user_id ) as seen_by, COUNT( CASE WHEN wp_wpwax_cs_messages_seen_by.user_id = 1 THEN 1 ELSE NULL END ) AS is_seen FROM wp_wpwax_cs_messages LEFT JOIN wp_wpwax_cs_messages_seen_by ON wp_wpwax_cs_messages.id = wp_wpwax_cs_messages_seen_by.message_id GROUP BY wp_wpwax_cs_messages.id ) AS message LEFT JOIN wp_wpwax_cs_session_term_relationships ON message.session_id = wp_wpwax_cs_session_term_relationships.session_id WHERE 1=1 GROUP BY message.session_id ORDER BY message.updated_on DESC LIMIT 15 OFFSET 0