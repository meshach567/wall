    -- Enable pgcrypto for gen_random_uuid()
    -- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    -- Create the 'posts' table for wall app cloud sync
    CREATE TABLE public.posts (
    id uuid not null default gen_random_uuid (),
    user_id uuid null,
    body text null,
    photo_url text null, -- URL for wall post image
    created_at timestamp with time zone null default now(),
    author text null,
    constraint posts_pkey primary key (id),
    constraint posts_body_check check ((char_length(body) <= 280))
    ) TABLESPACE pg_default;
    
    -- FOR INSERT WITH CHECK (true);

    -- Enable Row Level Security
    ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

    -- Allow public read access
    CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);

    -- Allow public insert access
    CREATE POLICY "Allow public insert access" ON posts FOR INSERT WITH CHECK (true);

    -- Enable real-time subscription
    ALTER PUBLICATION supabase_realtime ADD TABLE posts;

    -- Add author column
    ALTER TABLE posts ADD COLUMN author text null;

    -- Create storage bucket for photos --
    INSERT INTO storage.buckets (id, name, public) VALUES ('wallphoto', 'wallphoto', true);

    -- Create RLS policies for the storage bucket --
    CREATE POLICY "Anyone can view wall photos" ON storage.objects FOR SELECT USING  (bucket_id = 'wallphoto');

    CREATE POLICY "Anyone can upload wall photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'wallphoto');

    CREATE POLICY "Anyone can delete their own wall photos" ON storage.objects FOR DELETE USING (bucket_id = 'wallphoto');

    -- Add photo_url column posts table --
    ALTER TABLE public.posts ADD COLUMN photo_url text;