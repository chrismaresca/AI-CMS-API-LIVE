-- ==================
-- Authors Seed Data
-- ==================
INSERT INTO
    authors (
        first_name,
        last_name,
        email,
        title,
        bio,
        location
    )
VALUES
    (
        'Chris',
        'Maresca',
        'chris@chrismaresca.dev',
        'Founder',
        'make it up',
        'New York, NY'
    );

-- ==================
-- Brands Seed Data
-- ==================
INSERT INTO
    brands (
        name,
        description,
        founder,
        linkedin_handle,
        twitter_handle,
        website_url
    )
VALUES
    (
        'Chris Maresca',
        'Recent AI Developments and News, AI Workflows for Non-Technical and Technical Professionals, AI Workflows for Businesses, Blending AI and Design, AI Prompt Engineering, AI Tool Comparisons',
        'Chris Maresca',
        'chris-maresca',
        'thechrismaresca',
        'https://chrismaresca.dev'
    );

-- ==================
-- Tags Seed Data
-- ==================
INSERT INTO
    tags (name, description)
VALUES
    (
        'Recent AI Developments and News',
        'Stay up-to-date with the latest advancements, breakthroughs, and trends in artificial intelligence.'
    ),
    (
        'Deep Dive Code Walkthrough',
        'In-depth code walkthroughs to help professionals understand complex implementations.'
    ),
    (
        'AI Workflows for Non-Technical Professionals',
        'Simplified AI workflows designed to empower professionals without technical expertise.'
    ),
    (
        'AI Workflows for Technical Professionals',
        'Advanced AI workflows and processes tailored for developers, engineers, and other technical experts.'
    ),
    (
        'AI Workflows for Businesses',
        'AI solutions and workflows to drive efficiency, decision-making, and business growth.'
    ),
    (
        'Blending AI and Design',
        'Exploring the intersection of artificial intelligence and design to create innovative, user-centric experiences.'
    ),
    (
        'AI Prompt Engineering',
        'Techniques and best practices for crafting effective prompts to optimize AI responses.'
    ),
    (
        'AI Tool Comparisons',
        'Comprehensive comparisons of AI tools and platforms to help professionals choose the best solutions for their needs.'
    );

-- ==================
-- Articles Seed Data
-- ==================
INSERT INTO
    articles (
        title,
        content,
        excerpt,
        author_id,
        brand_id,
        publish_status
    )
VALUES
    (
        'Test Article',
        'Sample content for Chris Maresca''s brand.',
        'This is a test excerpt for the article.',
        (
            SELECT
                id
            FROM
                authors
            WHERE
                email = 'chris@chrismaresca.dev'
        ),
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        'draft'
    );

-- ==================
-- Brand Tags Seed Data
-- ==================
INSERT INTO
    brand_tags (brand_id, tag_id)
VALUES
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'Recent AI Developments and News'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'Deep Dive Code Walkthrough'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Workflows for Non-Technical Professionals'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Workflows for Technical Professionals'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Workflows for Businesses'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'Blending AI and Design'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Prompt Engineering'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Tool Comparisons'
        )
    );

-- ==================
-- Article Tags Seed Data
-- ==================
INSERT INTO
    article_tags (article_id, tag_id, brand_id)
VALUES
    (
        (
            SELECT
                id
            FROM
                articles
            WHERE
                title = 'Test Article'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'Recent AI Developments and News'
        ),
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                articles
            WHERE
                title = 'Test Article'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Workflows for Non-Technical Professionals'
        ),
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                articles
            WHERE
                title = 'Test Article'
        ),
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'AI Workflows for Technical Professionals'
        ),
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        )
    ),
    (
        (
            SELECT
                id
            FROM
                tags
            WHERE
                name = 'Deep Dive Code Walkthrough'
        ),
        (
            SELECT
                id
            FROM
                brands
            WHERE
                name = 'Chris Maresca'
        )
    );