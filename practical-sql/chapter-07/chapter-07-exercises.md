# Chapter 7: Try It Yourself — Exercises & Solutions

## Context

Consider these two tables for tracking a vinyl LP collection:

```sql
CREATE TABLE albums (
    album_id bigserial,
    album_catalog_code varchar(100),
    album_title text,
    album_artist text,
    album_release_date date,
    album_genre varchar(40),
    album_description text
);

CREATE TABLE songs (
    song_id bigserial,
    song_title text,
    song_artist text,
    album_id bigint
);
```

---

## Exercise 1

**Task:** Modify these CREATE TABLE statements to include primary and foreign keys plus additional constraints on both tables. Explain why you made your choices.

### Suggested Solution

```sql
CREATE TABLE albums (
    album_id bigserial,
    album_catalog_code varchar(100) UNIQUE,
    album_title text NOT NULL,
    album_artist text NOT NULL,
    album_release_date date,
    album_genre varchar(40),
    album_description text,
    CONSTRAINT albums_key PRIMARY KEY (album_id)
);

CREATE TABLE songs (
    song_id bigserial,
    song_title text NOT NULL,
    song_artist text,
    album_id bigint REFERENCES albums (album_id) ON DELETE CASCADE,
    CONSTRAINT songs_key PRIMARY KEY (song_id)
);
```

**Choices:**  
- PKs: `album_id`, `song_id` — stable, unique identifiers.  
- FK: `album_id` in `songs` → `albums`. CASCADE deletes songs when an album is deleted.  
- UNIQUE on `album_catalog_code` if it is unique per album.  
- NOT NULL on core identifying fields.

---

## Exercise 2

**Task:** Instead of using `album_id` as a surrogate key for your primary key, are there any columns in `albums` that could be useful as a natural key? What would you have to know to decide?

### Suggested Solution

**Possible natural key:** `album_catalog_code` — if every album has a unique catalog code and it never changes.

**To decide:**  
- Is it unique per album?  
- Can it change (e.g., reissues)?  
- Can it be NULL?  
- Is it stable and reliable from all data sources?

---

## Exercise 3

**Task:** To speed up queries, which columns are good candidates for indexes?

### Suggested Solution

```sql
CREATE INDEX idx_songs_album_id ON songs (album_id);
CREATE INDEX idx_albums_artist ON albums (album_artist);
CREATE INDEX idx_albums_catalog ON albums (album_catalog_code);  -- if UNIQUE, index exists
```

**Why:**  
- `album_id` in `songs` — used in JOINs and lookups.  
- `album_artist`, `album_catalog_code` — often filtered or searched.
