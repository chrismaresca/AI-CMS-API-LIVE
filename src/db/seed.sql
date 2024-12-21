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
        'Recent AI Developments and News, AI Workflows for both non-engineers and engineers, AI Workflows for Businesses, Blending AI and Design, AI Prompt Engineering, AI Tool Comparisons',
        'Chris Maresca',
        'chris-maresca',
        'thechrismaresca',
        'https://chrismaresca.dev'
    );

-- ==================
-- Tags Seed Data
-- ==================
INSERT INTO
    tags (name, seo_description, ai_description)
VALUES
    (
        'Recent AI Developments and News',
        'Stay up-to-date with the latest advancements, breakthroughs, and trends in artificial intelligence.',
        'Articles and news about recent AI developments and advancements.'
    ),
    (
        'Deep Dive Code Walkthrough',
        'In-depth code walkthroughs to help professionals understand complex implementations.',
        'Articles and tutorials about deep dive code walkthroughs. How to build specific tools with different AI libraries and tools. Different from AI Workflows for Engineers, as this category is more focused on specific tools and libraries, whereas AI Workflows for Engineers is more focused on high-level workflows and their implementation.'
    ),
    (
        'AI Workflows for Non-Engineers',
        'Simplified AI workflows designed to empower professionals without technical expertise.',
        'Articles and tutorials about AI workflows for non-engineers.'
    ),
    (
        'AI Workflows for Engineers',
        'Advanced AI workflows and processes tailored for developers, engineers, and other technical experts.',
        'Articles and tutorials about AI workflows for engineers. This includes intense code walkthroughs and detailed explanations of how to implement AI workflows for high technical projects.'
    ),
    (
        'AI Workflows for Businesses',
        'AI solutions and workflows to drive efficiency, decision-making, and business growth.',
        'Articles and tutorials about AI workflows for businesses. This includes how to implement AI workflows for business use cases. Be lenient with this category, as it can include a wide range of topics.'
    ),
    (
        'Blending AI and Design',
        'Exploring the intersection of artificial intelligence and design to create innovative, user-centric experiences.',
        'Articles and tutorials about blending AI and design.'
    ),
    (
        'AI Prompt Engineering',
        'Techniques and best practices for crafting effective prompts to optimize AI responses.',
        'Articles and tutorials about AI prompt engineering.'
    ),
    (
        'AI Tool Comparisons',
        'Comprehensive comparisons of AI tools and platforms to help professionals choose the best solutions for their needs.',
        'Articles and tutorials about AI tool comparisons.'
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
                name = 'AI Workflows for Non-Engineers'
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
                name = 'AI Workflows for Engineers'
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
                name = 'AI Workflows for Non-Engineers'
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
                name = 'AI Workflows for Engineers'
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

-- ==================
-- XML Blocks Seed Data
-- ==================
INSERT INTO
    xml_blocks (name)
VALUES
    ('Code Block');

INSERT INTO
    xml_block_parameters (xml_block_id, name, data_type, required, description)
VALUES
    (
        (
            SELECT id
            FROM xml_blocks
            WHERE name = 'Code Block'
        ),
        'language',
        'text',
        true,
        'The language of the code block.'
    ),
    (
        (
            SELECT id
            FROM xml_blocks
            WHERE name = 'Code Block'
        ),
        'code',
        'text',
        true,
        'The code to be displayed in the code block.'
    );


INSERT INTO
    brand_xml_blocks (brand_id, xml_block_id)
VALUES
    (
        (
            SELECT id
            FROM brands
            WHERE name = 'Chris Maresca'
        ),
        (
            SELECT id
            FROM xml_blocks
            WHERE name = 'Code Block'
        )
    );
