const BG_REMOVE = 'bg-remove';
const UPSCALE = 'upscale';

const bgRelated = [
  { to: '/tools/bg-remove', label: 'Background Remover' },
  { to: '/how-to/remove-background', label: 'How to Remove Background' },
  { to: '/how-to/remove-green-screen', label: 'Remove Green Screen' },
  { to: '/how-to/remove-background-product-photos', label: 'Product Photo Cleaner' },
  { to: '/tools', label: 'All Free Tools' },
];

const upRelated = [
  { to: '/tools/upscale', label: 'Image Upscaler' },
  { to: '/how-to/upscale-image', label: 'How to Upscale Image' },
  { to: '/how-to/upscale-to-4k', label: 'Upscale to 4K' },
  { to: '/tools/bg-remove', label: 'Background Remover' },
  { to: '/tools', label: 'All Free Tools' },
];

const seoToolPages = [
  // ── BG REMOVE pages ─────────────────────────────────────────────
  {
    path: '/tools/remove-white-background',
    title: 'Remove White Background from Image Free Online',
    description: 'Remove white background from any image free online. AI-powered, no signup, instant transparent PNG downloads for e-commerce and design.',
    heroTitle: 'Remove White Background from Image',
    heroSubtitle: 'Free AI tool — no signup, no watermarks, instant results',
    tool: BG_REMOVE,
    toolCta: 'Remove White Background Now',
    steps: [
      { title: 'Upload Your Image', desc: 'Drag and drop a JPG, PNG or WebP with a white background. No account needed.' },
      { title: 'AI Detects and Removes the White', desc: 'Our neural network isolates the subject and removes the white background in 3–5 seconds.' },
      { title: 'Download Transparent PNG', desc: 'Get a clean transparent PNG ready for listings, thumbnails or designs.' },
    ],
    content: {
      intro: 'A white background might look clean, but it limits where you can place your image. Removing it gives you a transparent PNG that works on any color, any design, any platform.',
      sections: [
        {
          h2: 'Why Remove White Background?',
          text: 'Marketplaces like Amazon and eBay require product photos on pure white — but designers, social media managers and print shops often need the opposite: a transparent cutout. With AI, you get both options in seconds.',
        },
        {
          h2: 'Who Uses This?',
          list: [
            'E-commerce sellers who need transparent product cutouts for composite images.',
            'Graphic designers preparing assets for posters, banners and mockups.',
            'Social media creators making layered thumbnails and stories.',
            'Students and educators building presentations with clean graphics.',
          ],
        },
        {
          h2: 'Tips for Best Results',
          list: [
            'Use images where the subject has clear edges against the white area.',
            'Higher resolution inputs produce cleaner, sharper cutouts.',
            'JPG works fine — the AI handles compression artifacts well.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Will it work if my background is off-white or light grey?', a: 'Yes. The AI detects the subject vs. background regardless of whether the background is pure white, off-white or light grey.' },
      { q: 'Can I use this for product photos?', a: 'Absolutely. This is one of the most common use cases — Amazon, eBay, Shopify and Etsy sellers use it daily.' },
      { q: 'Is there a size limit?', a: 'You can upload standard photo sizes. For very large files (20MB+), try compressing first.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-passport',
    title: 'Remove Background from Passport Photo Free Online',
    description: 'Remove background from passport photos free online. AI-powered, clean white or transparent output, no signup required.',
    heroTitle: 'Remove Background from Passport Photo',
    heroSubtitle: 'Instant AI cutout — white or transparent, your choice',
    tool: BG_REMOVE,
    toolCta: 'Process Passport Photo',
    steps: [
      { title: 'Upload Your Passport Photo', desc: 'Take a photo of your passport-size picture or upload the digital file.' },
      { title: 'AI Removes the Background', desc: 'The subject is isolated cleanly in seconds — hair, edges, everything.' },
      { title: 'Download Your Clean Photo', desc: 'Get a transparent or white-background passport photo ready for printing.' },
    ],
    content: {
      intro: 'Passport applications, visa forms and ID cards all demand specific background colors. Instead of retaking photos or paying a studio, use AI to swap the background in seconds.',
      sections: [
        {
          h2: 'When You Need This',
          list: [
            'Applying for a passport and the photo has a coloured or patterned background.',
            'Visa applications requiring a specific background shade.',
            'Company ID cards, student IDs or membership forms.',
            'Online profiles needing a professional headshot with a clean background.',
          ],
        },
        {
          h2: 'How to Get the Best Passport Photo',
          list: [
            'Use even, front-facing lighting — no harsh shadows on the face.',
            'Keep a neutral expression with eyes open.',
            'The original photo should have decent resolution (at least 600×600px).',
            'After background removal, overlay the result on the required colour (white, blue or grey).',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Can I change the background to white for a passport application?', a: 'Yes. Remove the background with our tool, then place the transparent PNG on a white canvas using any image editor.' },
      { q: 'Does it preserve hair detail?', a: 'Our AI handles hair, glasses and fine edges cleanly in most cases.' },
      { q: 'Is this accepted for official passport submissions?', a: 'The tool produces the image — you are responsible for meeting your country\'s specific passport photo requirements.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-product',
    title: 'Product Photo Background Remover Free Online',
    description: 'Remove backgrounds from product photos free online. AI-powered cutouts for Amazon, eBay, Shopify — no signup, no watermarks.',
    heroTitle: 'Product Photo Background Remover',
    heroSubtitle: 'Clean product cutouts for your online store in seconds',
    tool: BG_REMOVE,
    toolCta: 'Clean Up Product Photos',
    steps: [
      { title: 'Upload Your Product Photo', desc: 'Any format — JPG, PNG, WebP. Snapshots, studio shots, phone photos all work.' },
      { title: 'AI Isolates the Product', desc: 'The background is removed in 3–5 seconds with clean, professional edges.' },
      { title: 'Download Transparent PNG', desc: 'Drop the cutout on white for marketplaces or any background for ads.' },
    ],
    content: {
      intro: 'Clean product photos sell more. Whether you are listing on Amazon, running Shopify ads or posting on Instagram, a sharp transparent cutout makes your product look professional and trustworthy.',
      sections: [
        {
          h2: 'Why Background-Free Product Photos Convert Better',
          text: 'Studies show that product images with clean, consistent backgrounds increase click-through rates and reduce return rates. Buyers associate professional imagery with professional products.',
        },
        {
          h2: 'Works for Every Product Category',
          list: [
            'Electronics, gadgets and accessories.',
            'Clothing, shoes and fashion items.',
            'Food and beverages.',
            'Handmade crafts, jewellery and art.',
            'Furniture and home decor.',
          ],
        },
        {
          h2: 'Pro Tips for Product Photography',
          list: [
            'Shoot in natural light near a window for even illumination.',
            'Use a simple backdrop (even a white sheet) to help the AI.',
            'Capture multiple angles and process each through the tool.',
            'For catalogue consistency, place all cutouts on the same white canvas.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Can I use this for Amazon product listings?', a: 'Yes. Download the transparent PNG, place it on a pure white background, and you meet Amazon\'s image requirements.' },
      { q: 'Does it work on reflective products like glass or metal?', a: 'It handles most reflective surfaces well. For extreme reflections, a well-lit original photo helps.' },
      { q: 'How many product photos can I process?', a: 'Unlimited. There are no daily caps, no credit system, no restrictions.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-green-screen-online',
    title: 'Remove Green Screen Online Free — No Software Needed',
    description: 'Remove green screen backgrounds from photos free online. AI-powered, no chroma key software, instant transparent PNG downloads.',
    heroTitle: 'Remove Green Screen Online Free',
    heroSubtitle: 'No chroma key software needed — AI does it in seconds',
    tool: BG_REMOVE,
    toolCta: 'Remove Green Screen Now',
    steps: [
      { title: 'Upload Your Green Screen Photo', desc: 'Any JPG, PNG or WebP shot against a green backdrop.' },
      { title: 'AI Removes the Green', desc: 'Subject is isolated and green spill from edges is cleaned automatically.' },
      { title: 'Download Transparent PNG', desc: 'Use your cutout on any background — YouTube thumbnails, presentations, social posts.' },
    ],
    content: {
      intro: 'Green screens are great for filming, but the final output needs a clean subject without the green. Instead of chroma key software, use our AI to get a perfect cutout in seconds.',
      sections: [
        {
          h2: 'Who Uses Green Screen Removal?',
          list: [
            'YouTubers and streamers creating thumbnail graphics.',
            'E-commerce sellers shooting products on green for easy background swaps.',
            'Educators and presenters building slide decks with transparent graphics.',
            'Photographers and content creators making composite images.',
          ],
        },
        {
          h2: 'Why AI Beats Traditional Chroma Key',
          text: 'Traditional chroma key requires manual spill suppression, edge refinement and matte cleaning. Our AI handles all of that automatically — including green spill on hair and clothing edges.',
        },
        {
          h2: 'Shooting Tips',
          list: [
            'Keep the green screen evenly lit with no wrinkles or shadows.',
            'Leave some distance between subject and green screen to reduce spill.',
            'Higher resolution originals produce cleaner edge detail.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Does this work on green screen video frames?', a: 'Yes — export a frame as JPG or PNG from your video editor, then upload it here.' },
      { q: 'Will there be green edges on hair?', a: 'The AI removes green spill from edges including hair. Results are clean in most cases.' },
      { q: 'Can I replace the green with a different color?', a: 'Download the transparent PNG, then place it on any background colour using an image editor or design tool.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-profile-picture',
    title: 'Remove Background from Profile Picture Free Online',
    description: 'Remove background from your profile picture free online. AI-powered cutout for LinkedIn, Instagram, WhatsApp — no signup.',
    heroTitle: 'Remove Background from Profile Picture',
    heroSubtitle: 'Professional headshots in seconds — free, no signup',
    tool: BG_REMOVE,
    toolCta: 'Clean Up Profile Picture',
    steps: [
      { title: 'Upload Your Photo', desc: 'Selfie, headshot, or any portrait — JPG, PNG or WebP.' },
      { title: 'AI Removes the Background', desc: 'Your face and shoulders are isolated cleanly in 3–5 seconds.' },
      { title: 'Download Transparent PNG', desc: 'Use it on LinkedIn, Instagram, WhatsApp or any platform.' },
    ],
    content: {
      intro: 'Your profile picture is the first thing people see. A clean, professional headshot with a simple or transparent background makes a strong impression — whether it is for work, social media or personal branding.',
      sections: [
        {
          h2: 'Where to Use Your New Profile Picture',
          list: [
            'LinkedIn — professional headshots with clean backgrounds get more profile views.',
            'Instagram, Facebook and Twitter/X — stand out in feeds and comment sections.',
            'WhatsApp, Telegram and messaging apps — replace the default avatar.',
            'Email signatures — a polished headshot adds credibility.',
            'Resume and CV — many recruiters check your online presence.',
          ],
        },
        {
          h2: 'Photography Tips for Profile Pictures',
          list: [
            'Natural light from a window works better than flash.',
            'Shoot at eye level for a confident, approachable look.',
            'A plain background (even a wall) helps the AI produce cleaner results.',
            'Smile — photos with genuine smiles get 20%+ more engagement.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Will it work on selfies?', a: 'Yes. Upload any portrait — selfie, professional headshot or casual photo — and the AI isolates you cleanly.' },
      { q: 'Can I add a solid color background after?', a: 'Download the transparent PNG and place it on white, grey, blue or any colour in your design tool.' },
      { q: 'Does it handle glasses and jewellery?', a: 'Yes, our AI handles glasses, earrings, necklaces and other accessories without issues.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-jpg',
    title: 'Remove Background from JPG Image Free Online',
    description: 'Remove background from JPG images free online. AI-powered, handles compression artifacts, instant transparent PNG downloads.',
    heroTitle: 'Remove Background from JPG',
    heroSubtitle: 'Works perfectly with compressed JPG files — free, no signup',
    tool: BG_REMOVE,
    toolCta: 'Remove JPG Background',
    steps: [
      { title: 'Upload Your JPG', desc: 'Drag and drop any JPG file — phone photos, screenshots, downloads all work.' },
      { title: 'AI Processes the Image', desc: 'Handles JPG compression artifacts and produces a clean transparent cutout.' },
      { title: 'Download Transparent PNG', desc: 'Get a high-quality PNG ready for any use.' },
    ],
    content: {
      intro: 'JPG is the most common image format — your phone shoots in JPG, screenshots save as JPG, and most downloads are JPG. Our AI handles JPG compression artifacts to produce clean transparent cutouts.',
      sections: [
        {
          h2: 'Why JPG Is No Problem',
          text: 'Unlike older tools that struggled with JPG compression blocks around edges, our neural network is trained to handle real-world image quality. Even slightly blurry or compressed JPGs produce good results.',
        },
        {
          h2: 'Common JPG Use Cases',
          list: [
            'Phone photos — the most common source for quick background removal.',
            'Screenshots — extract subjects from screenshots for presentations.',
            'Downloaded images — process any JPG from the web for your projects.',
            'Scanned documents — clean up scanned images with background removal.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Why output PNG instead of JPG?', a: 'PNG supports transparency. JPG does not — any transparent area would become white or black. PNG preserves the cutout cleanly.' },
      { q: 'Will compressed JPGs look bad after processing?', a: 'The AI handles compression well. For best results, use the highest quality JPG you have.' },
      { q: 'Can I upload very large JPGs?', a: 'Standard photo sizes work fine. Files over 20MB may need compression first.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-png',
    title: 'Remove Background from PNG Image Free Online',
    description: 'Remove background from PNG images free online. AI-powered, preserves transparency, instant downloads, no signup required.',
    heroTitle: 'Remove Background from PNG',
    heroSubtitle: 'Clean transparent cutouts from any PNG — free, instant',
    tool: BG_REMOVE,
    toolCta: 'Process PNG Image',
    steps: [
      { title: 'Upload Your PNG', desc: 'Drag and drop a PNG file — any size, any subject.' },
      { title: 'AI Creates Clean Cutout', desc: 'Subject is isolated in seconds with crisp, clean edges.' },
      { title: 'Download Transparent PNG', desc: 'Your new transparent PNG is ready for any project.' },
    ],
    content: {
      intro: 'PNG files often already have transparency, but sometimes they come with unwanted backgrounds, watermarks or rough edges. Our AI re-processes any PNG to give you a cleaner, more precise cutout.',
      sections: [
        {
          h2: 'When PNG Background Removal Helps',
          list: [
            'PNGs with rough or jagged edges from other tools.',
            'Downloaded PNGs that have a solid background instead of transparency.',
            'PNGs with watermarks or unwanted elements in the background.',
            'Re-processing old cutouts for higher quality output.',
          ],
        },
        {
          h2: 'PNG vs JPG for Background Removal',
          text: 'Both formats work. PNG preserves more detail (especially around edges), so it often produces the cleanest results. But our AI handles JPG compression artifacts well too.',
        },
      ],
    },
    faqs: [
      { q: 'My PNG already has transparency — why use this?', a: 'If your existing cutout has rough edges, halos or artifacts, our AI can re-process it for a cleaner result.' },
      { q: 'Will it keep the existing transparency?', a: 'The tool creates a new cutout from scratch, which is usually cleaner than the original.' },
      { q: 'Does it support PNG-24 and PNG-8?', a: 'Yes. All PNG variants are supported.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/background-remover-no-signup',
    title: 'Background Remover No Signup — Free, Instant, Private',
    description: 'Background remover with no signup required. Free, private, unlimited — upload any image and get a transparent PNG in seconds.',
    heroTitle: 'Background Remover No Signup',
    heroSubtitle: 'No account, no email, no data collected — just upload and go',
    tool: BG_REMOVE,
    toolCta: 'Remove Background Free',
    steps: [
      { title: 'Open the Tool', desc: 'No registration, no login, no form to fill out.' },
      { title: 'Upload Any Image', desc: 'JPG, PNG or WebP — drag and drop or click to select.' },
      { title: 'Download Your Transparent PNG', desc: 'Instant result, saved directly to your device.' },
    ],
    content: {
      intro: 'Most "free" background removers require you to create an account, enter credit card details, or watermark your output. Ours is actually free — no strings attached.',
      sections: [
        {
          h2: 'Why No Signup Matters',
          list: [
            'Privacy — your images are processed and deleted, never stored on our servers.',
            'Speed — no account creation, no email verification, no onboarding flow.',
            'Trust — no means to sell your data, send marketing emails or track your usage.',
            'Simplicity — open the tool, upload, download, done.',
          ],
        },
        {
          h2: 'What You Actually Get',
          list: [
            'Unlimited background removals — no daily caps or credit system.',
            'Full resolution output — no downscaling, no compression.',
            'Transparent PNG download — ready for any use.',
            'Works on any device — phone, tablet, laptop, desktop.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Is it really free? What is the catch?', a: 'There is no catch. We monetize through partnerships and premium features in the future. Today, background removal is completely free.' },
      { q: 'Are my images stored or shared?', a: 'No. Images are processed in memory and immediately deleted. We never store, share or sell your uploads.' },
      { q: 'Is there a daily limit?', a: 'No. Use it as many times as you want, every day.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/background-eraser',
    title: 'Background Eraser Online Free — AI-Powered Cutout',
    description: 'Erase image backgrounds online free with AI. Clean transparent PNGs in seconds — no signup, no watermarks, unlimited use.',
    heroTitle: 'Background Eraser Online Free',
    heroSubtitle: 'AI erases backgrounds in seconds — clean, fast, free',
    tool: BG_REMOVE,
    toolCta: 'Erase Background Now',
    steps: [
      { title: 'Upload Your Image', desc: 'JPG, PNG or WebP — any size, any subject.' },
      { title: 'AI Erases the Background', desc: 'Subject is isolated cleanly in 3–5 seconds.' },
      { title: 'Download Transparent PNG', desc: 'Clean cutout saved directly to your device.' },
    ],
    content: {
      intro: 'Background erasers used to mean manual masking with pen tools. Today, AI does the hard work — finding the subject, erasing the background, and delivering a clean transparent PNG in seconds.',
      sections: [
        {
          h2: 'AI vs Manual Background Erasing',
          text: 'Manual tools require selecting every edge by hand — hair, fabric, glass and complex shapes take hours. Our AI does it automatically in 3–5 seconds with quality that matches professional retouching.',
        },
        {
          h2: 'Works on Any Subject',
          list: [
            'People — portraits, headshots, group photos.',
            'Products — electronics, clothing, food, jewellery.',
            'Animals — pets, wildlife, farm animals.',
            'Objects — furniture, vehicles, tools, graphics.',
            'Complex shapes — hair, glass, translucent materials.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'How is this different from Photoshop?', a: 'Photoshop requires manual masking or the "Select Subject" tool. Our AI achieves similar results automatically in seconds, with no software to learn.' },
      { q: 'Does it work on complex backgrounds?', a: 'Yes. The AI identifies the main subject regardless of background complexity — busy streets, patterned walls, outdoor scenes.' },
      { q: 'Can I erase specific parts of the background manually?', a: 'Currently the tool processes the entire image automatically. Manual refinement is not yet available.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/remove-background-from-photo',
    title: 'Remove Background from Photo Free Online — Instant AI',
    description: 'Remove background from any photo free online. AI-powered, no signup, transparent PNG in seconds — works on any device.',
    heroTitle: 'Remove Background from Photo',
    heroSubtitle: 'Upload any photo — get a clean transparent cutout in seconds',
    tool: BG_REMOVE,
    toolCta: 'Remove Photo Background',
    steps: [
      { title: 'Upload Your Photo', desc: 'Any format — JPG, PNG, WebP. Phone shots, camera photos, screenshots.' },
      { title: 'AI Removes the Background', desc: 'Clean subject isolation in 3–5 seconds.' },
      { title: 'Download Transparent PNG', desc: 'Ready for social media, design, printing or any project.' },
    ],
    content: {
      intro: 'Whether it is a phone snapshot, a professional photograph or a scanned image, our AI removes the background cleanly and delivers a transparent PNG you can use anywhere.',
      sections: [
        {
          h2: 'Works on Any Type of Photo',
          list: [
            'Selfies and portraits — perfect for profile pictures and social media.',
            'Product shots — clean cutouts for e-commerce listings.',
            'Landscape subjects — isolate buildings, cars, plants or objects.',
            'Group photos — remove background from any number of people.',
          ],
        },
        {
          h2: 'Tips for Perfect Results',
          list: [
            'Good lighting produces the cleanest edges.',
            'Sharp focus on the subject helps the AI identify boundaries.',
            'Higher resolution originals give more detail in the final cutout.',
            'Even casual phone photos work well — the AI handles real-world quality.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'What photo formats are supported?', a: 'JPG, PNG and WebP — the three most common web image formats.' },
      { q: 'Is my photo private?', a: 'Yes. Images are processed in memory and immediately deleted. We never store or share your uploads.' },
      { q: 'Can I use this on my phone?', a: 'Yes. The tool works in any modern mobile browser — no app to install.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/photo-background-changer',
    title: 'Photo Background Changer Free Online — AI Tool',
    description: 'Change photo backgrounds free online with AI. Remove the old background, download transparent PNG, place on any new background.',
    heroTitle: 'Photo Background Changer',
    heroSubtitle: 'Remove any background — then place your subject on a new one',
    tool: BG_REMOVE,
    toolCta: 'Change Background Now',
    steps: [
      { title: 'Upload Your Photo', desc: 'Any image with a background you want to change.' },
      { title: 'AI Removes the Old Background', desc: 'Clean transparent cutout in 3–5 seconds.' },
      { title: 'Download & Place on New Background', desc: 'Use the transparent PNG in any design tool to add a new background.' },
    ],
    content: {
      intro: 'Changing a photo background used to require advanced editing skills. Now, AI removes the old background instantly — giving you a transparent cutout you can place on any new background.',
      sections: [
        {
          h2: 'How to Change a Photo Background',
          text: 'Step 1: Remove the background with our tool (3 seconds). Step 2: Open any design tool — Canva, Figma, Google Slides. Step 3: Place the transparent cutout on your desired background. Done.',
        },
        {
          h2: 'Popular Background Changes',
          list: [
            'Replace cluttered background with clean white for product photos.',
            'Swap indoor background for outdoor scenes in portraits.',
            'Add branded backgrounds for corporate headshots.',
            'Create fun compositions for social media and thumbnails.',
            'Change background colour for passport or ID photos.',
          ],
        },
        {
          h2: 'Best Tools for Adding New Backgrounds',
          list: [
            'Canva — drag and drop, great for non-designers.',
            'Figma — precise control for professional designers.',
            'Google Slides — quick and easy for presentations.',
            'Photoshop — full control for advanced editing.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Do you add the new background automatically?', a: 'Not yet. We remove the old background and give you a transparent PNG. You place it on any new background using your preferred design tool.' },
      { q: 'Can I change background to a specific colour?', a: 'Download the transparent PNG and place it on any solid colour, gradient or image in a design tool.' },
      { q: 'How long does the whole process take?', a: 'Background removal takes 3–5 seconds. Adding a new background in Canva or similar takes another 10–20 seconds.' },
    ],
    relatedLinks: bgRelated,
  },

  {
    path: '/tools/cut-out-image',
    title: 'Cut Out Image Online Free — AI-Powered Precision',
    description: 'Cut out any subject from an image free online. AI-powered precision cutout — transparent PNG in seconds, no signup.',
    heroTitle: 'Cut Out Image Online Free',
    heroSubtitle: 'Precise subject cutout — no scissors, no pen tool, just AI',
    tool: BG_REMOVE,
    toolCta: 'Cut Out Subject',
    steps: [
      { title: 'Upload Your Image', desc: 'Any photo — the AI finds the main subject automatically.' },
      { title: 'AI Cuts Out the Subject', desc: 'Clean, precise edges in 3–5 seconds — even on complex shapes.' },
      { title: 'Download Transparent PNG', desc: 'Use your cutout anywhere — designs, presentations, listings.' },
    ],
    content: {
      intro: 'Image cutout used to mean hours with the pen tool in Photoshop. Now, AI identifies the main subject and cuts it out with precision that matches professional retouching — in seconds.',
      sections: [
        {
          h2: 'What Is an Image Cutout?',
          text: 'A cutout is a subject extracted from its background — a person, product, animal or object with a transparent background. It is the foundation of graphic design, e-commerce photography and social media content.',
        },
        {
          h2: 'Use Cases for Cutouts',
          list: [
            'Product photography — clean cutouts for marketplace listings.',
            'Graphic design — isolated elements for posters, banners and ads.',
            'Social media — transparent subjects for layered compositions.',
            'Presentations — clean graphics without distracting backgrounds.',
            'Printing — cutouts for stickers, cards and merchandise.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Does it work on multiple subjects?', a: 'The AI focuses on the main subject. For group photos, it isolates all people as a single unit.' },
      { q: 'How precise are the edges?', a: 'Very precise — the AI handles hair, fabric, glass and complex shapes cleanly.' },
      { q: 'Can I choose which subject to cut out?', a: 'Currently the tool automatically selects the most prominent subject.' },
    ],
    relatedLinks: bgRelated,
  },

  // ── UPSCALE pages ───────────────────────────────────────────────
  {
    path: '/tools/upscale-image-8x',
    title: 'Upscale Image 8x Online Free — AI Enlargement',
    description: 'Upscale images up to 8x free online. AI-powered enlargement preserves detail — no quality loss, no signup.',
    heroTitle: 'Upscale Image 8x',
    heroSubtitle: 'AI enlargement up to 8x — sharp detail, zero quality loss',
    tool: UPSCALE,
    toolCta: 'Upscale Image Now',
    steps: [
      { title: 'Upload Your Image', desc: 'Any JPG, PNG or WebP — even small, low-res images work.' },
      { title: 'AI Enlarges and Enhances', desc: 'Neural network upscales and adds realistic detail in seconds.' },
      { title: 'Download High-Resolution Result', desc: 'Get a sharp, detailed image ready for print or digital use.' },
    ],
    content: {
      intro: 'Traditional upscaling stretches pixels and produces blurry results. AI upscaling understands what the image should look like — adding realistic detail, sharp edges and clean textures.',
      sections: [
        {
          h2: 'How AI Upscaling Works',
          text: 'Instead of simply stretching pixels, the neural network analyzes the image, predicts what detail should exist at higher resolution, and generates it. The result is a larger image that looks naturally sharp.',
        },
        {
          h2: 'When to Use 8x Upscaling',
          list: [
            'Printing small photos at large sizes — posters, canvases, banners.',
            'Restoring old or low-resolution images — family photos, vintage graphics.',
            'Enlarging web images for print use.',
            'Creating high-resolution assets from thumbnails.',
          ],
        },
        {
          h2: 'Tips for Best Results',
          list: [
            'Start with the highest quality source available.',
            'Avoid upscaling already-blurry images beyond 4x — diminishing returns.',
            'For print, upscale to the target DPI (300 DPI = 8x for web images).',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Does 8x upscaling actually add real detail?', a: 'AI upscaling intelligently predicts and generates detail based on patterns it learned from millions of images. It is not "real" data, but it looks natural and sharp.' },
      { q: 'Is there a maximum input size?', a: 'Standard photo sizes work well. Very large inputs (5000px+) may take longer to process.' },
      { q: 'Can I use this for print?', a: 'Yes. Upscale to your target resolution, then send to print. For best print results, aim for 300 DPI at the final size.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/upscale-image-to-8k',
    title: 'Upscale Image to 8K Free Online — AI Resolution Boost',
    description: 'Upscale images to 8K resolution free online. AI-powered — adds detail and sharpness, no quality loss, no signup.',
    heroTitle: 'Upscale Image to 8K',
    heroSubtitle: 'AI resolution boost — from any size to 8K detail',
    tool: UPSCALE,
    toolCta: 'Upscale to 8K',
    steps: [
      { title: 'Upload Your Image', desc: 'Any JPG, PNG or WebP — the AI handles any starting resolution.' },
      { title: 'AI Boosts Resolution', desc: 'Neural network adds detail and sharpness for ultra-high resolution output.' },
      { title: 'Download 8K-Ready Image', desc: 'Get a massive, detailed image for print, display or archival.' },
    ],
    content: {
      intro: '8K resolution (7680×4320 pixels) is the future of displays and print. Our AI upscaler can take any image and enlarge it to 8K dimensions while adding realistic detail.',
      sections: [
        {
          h2: 'What Is 8K Resolution?',
          text: '8K means 7680×4320 pixels — roughly 33 million pixels, or 4× the detail of 4K. It is used in high-end displays, large-format print and professional photography.',
        },
        {
          h2: 'When You Need 8K',
          list: [
            'Large format printing — billboards, posters, canvas prints.',
            'High-end display content — 8K TVs and monitors.',
            'Archival — preserving photos at maximum quality.',
            'Professional photography — oversized prints for galleries.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Will a small image look good at 8K?', a: 'AI adds detail intelligently, but starting from a very small source (like a 200px thumbnail) will have limits. Higher quality input = better 8K output.' },
      { q: 'How large will the file be?', a: '8K images are large — typically 10–30MB depending on complexity. Use a format that supports your needs (PNG for quality, JPG for smaller size).' },
      { q: 'Can I print at 8K?', a: 'Yes. 8K at 300 DPI gives you a print size of roughly 26×14 inches — perfect for large posters and wall art.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/ai-image-upscaler',
    title: 'AI Image Upscaler Free Online — No Quality Loss',
    description: 'AI image upscaler — enlarge photos free online without losing quality. Neural network adds realistic detail, no signup required.',
    heroTitle: 'AI Image Upscaler',
    heroSubtitle: 'Neural network upscaling — realistic detail, no pixelation',
    tool: UPSCALE,
    toolCta: 'Upscale with AI',
    steps: [
      { title: 'Upload Your Image', desc: 'Any photo — small, low-res or compressed.' },
      { title: 'AI Analyzes and Enlarges', desc: 'Neural network predicts and generates detail for the larger size.' },
      { title: 'Download Enhanced Image', desc: 'Sharp, detailed output ready for any use.' },
    ],
    content: {
      intro: 'Traditional upscaling stretches pixels. AI upscaling understands content — it knows what skin, fabric, text and landscapes should look like at higher resolution, and generates accordingly.',
      sections: [
        {
          h2: 'AI Upscaling vs Traditional Upscaling',
          text: 'Traditional methods (bicubic, lanczos) interpolate between existing pixels — the result is blurry. AI upscaling uses trained neural networks to predict and generate new detail that looks natural.',
        },
        {
          h2: 'What AI Can Improve',
          list: [
            'Sharpness — edges become crisp instead of soft.',
            'Detail — textures gain realistic information.',
            'Resolution — output can be 2×, 4× or larger than the original.',
            'Compression artifacts — reduces JPG blockiness while upscaling.',
          ],
        },
        {
          h2: 'Best For',
          list: [
            'Old photos that need new life.',
            'Web images that need to be printed.',
            'Thumbnails that need to become hero images.',
            'Screenshots that need to be presentation-ready.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'Is this different from just zooming in?', a: 'Yes. Zooming in shows you bigger pixels. AI upscaling generates new detail so the image looks sharp at any size.' },
      { q: 'Does it work on text in images?', a: 'AI upscaling improves text legibility in most cases, but results depend on the original quality.' },
      { q: 'Can I upscale by 2× instead of the maximum?', a: 'The tool upscales to the optimal size for your image. For specific scaling, adjust your source resolution before uploading.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/image-enlarger',
    title: 'Image Enlarger Free Online — No Quality Loss, AI-Powered',
    description: 'Enlarge images free online without losing quality. AI-powered enlargement — sharp, detailed, no signup, instant download.',
    heroTitle: 'Image Enlarger Free Online',
    heroSubtitle: 'Enlarge any image — AI preserves sharpness and detail',
    tool: UPSCALE,
    toolCta: 'Enlarge Image Now',
    steps: [
      { title: 'Upload Your Image', desc: 'Any small or medium-sized photo you want to enlarge.' },
      { title: 'AI Enlarges with Detail', desc: 'Neural network generates new detail for the larger size.' },
      { title: 'Download Enlarged Image', desc: 'Sharp, clean output at the new resolution.' },
    ],
    content: {
      intro: 'Enlarging an image used to mean blurry, pixelated results. AI image enlargement generates new detail based on what the image should look like at a larger size — producing sharp, natural-looking results.',
      sections: [
        {
          h2: 'Why Enlarge Images?',
          list: [
            'Print — small photos need to be enlarged for framing, posters or merchandise.',
            'Web — enlarge thumbnails for hero images or banners.',
            'Archive — enlarge old photos for high-quality digital storage.',
            'Design — larger source images give more flexibility in composition.',
          ],
        },
        {
          h2: 'How It Preserves Quality',
          text: 'The AI does not just stretch pixels — it analyzes the image content and generates new, realistic detail for the larger size. The result looks like it was natively captured at the higher resolution.',
        },
      ],
    },
    faqs: [
      { q: 'How much can I enlarge an image?', a: 'You can enlarge by 2×, 4× or more depending on the source resolution. The AI adds detail at each level.' },
      { q: 'Will it remove blur from a blurry photo?', a: 'AI can improve softness and reduce blur, but it cannot fully restore a severely out-of-focus image.' },
      { q: 'Is the output print-ready?', a: 'Yes. Enlarge to your target size, then check the DPI. For print, aim for 300 DPI at the final dimensions.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/enhance-photo-quality',
    title: 'Enhance Photo Quality Free Online — AI Enhancement',
    description: 'Enhance photo quality free online with AI. Improve sharpness, detail and clarity — no signup, no watermarks, instant download.',
    heroTitle: 'Enhance Photo Quality Free',
    heroSubtitle: 'AI improves sharpness, detail and clarity in seconds',
    tool: UPSCALE,
    toolCta: 'Enhance Photo Now',
    steps: [
      { title: 'Upload Your Photo', desc: 'Any JPG, PNG or WebP — blurry, soft or low-quality images welcome.' },
      { title: 'AI Enhances the Quality', desc: 'Neural network improves sharpness, detail and overall clarity.' },
      { title: 'Download Enhanced Photo', desc: 'Get a noticeably sharper, cleaner version of your image.' },
    ],
    content: {
      intro: 'Low-quality photos are everywhere — old phone cameras, screenshots, compressed social media images. AI enhancement can make them look significantly better by improving sharpness, reducing noise and adding detail.',
      sections: [
        {
          h2: 'What AI Enhancement Improves',
          list: [
            'Sharpness — soft edges become crisp and defined.',
            'Detail — flat areas gain texture and information.',
            'Noise reduction — grain and digital noise are smoothed out.',
            'Overall clarity — the image looks cleaner and more professional.',
          ],
        },
        {
          h2: 'When to Use Photo Enhancement',
          list: [
            'Old photos from early手机cameras (2010–2015 era).',
            'Screenshots that need to look professional.',
            'Social media images that have been compressed.',
            'Product photos that need a quality boost before listing.',
            'Profile pictures that need to look sharper.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'How is this different from upscaling?', a: 'Upscaling increases resolution (more pixels). Enhancement improves quality at the current resolution (sharper, cleaner, less noise). Our tool does both.' },
      { q: 'Can it fix a very blurry photo?', a: 'It can improve mild blur significantly. Severely out-of-focus images have limits, but results are usually noticeably better.' },
      { q: 'Is the enhancement noticeable?', a: 'Yes. Most users see a clear improvement in sharpness and detail, especially on low-quality source images.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/unblur-image',
    title: 'Unblur Image Free Online — AI Deblur Tool',
    description: 'Unblur images free online with AI. Fix blurry photos, sharpen details, restore clarity — no signup, instant download.',
    heroTitle: 'Unblur Image Free Online',
    heroSubtitle: 'AI fixes blurry photos — sharpen details in seconds',
    tool: UPSCALE,
    toolCta: 'Unblur Image Now',
    steps: [
      { title: 'Upload Your Blurry Image', desc: 'Motion blur, focus blur or soft images — upload any JPG, PNG or WebP.' },
      { title: 'AI Sharpens the Image', desc: 'Neural network analyzes and reverses blur patterns in seconds.' },
      { title: 'Download Sharpened Image', desc: 'Get a clear, sharp version of your blurry photo.' },
    ],
    content: {
      intro: 'Blurry photos happen to everyone — shaky hands, wrong focus, motion. AI deblur technology can reverse these artifacts and restore clarity that was thought lost.',
      sections: [
        {
          h2: 'Types of Blur AI Can Fix',
          list: [
            'Motion blur — camera or subject movement during capture.',
            'Focus blur — slightly out-of-focus shots.',
            'Soft focus — images that lack sharpness.',
            'Compression blur — quality loss from heavy JPG compression.',
          ],
        },
        {
          h2: 'How AI Deblur Works',
          text: 'The neural network has been trained on millions of blurry-sharp image pairs. It learns to predict what the sharp version should look like and reconstructs it — adding detail that was lost to blur.',
        },
      ],
    },
    faqs: [
      { q: 'Can it fix severe motion blur?', a: 'It can significantly improve mild to moderate motion blur. Severe blur (where the subject is unrecognizable) has limits.' },
      { q: 'Will it make the image look artificial?', a: 'The AI aims for natural-looking results. In most cases, the output looks like a properly focused photo.' },
      { q: 'Is this the same as sharpening in Photoshop?', a: 'Traditional sharpening increases edge contrast but does not add detail. AI deblur actually reconstructs lost detail.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/photo-enhancer',
    title: 'Photo Enhancer AI Free Online — Instant Quality Boost',
    description: 'Enhance photos free online with AI. Improve sharpness, resolution and detail — no signup, no watermarks, instant results.',
    heroTitle: 'Photo Enhancer AI Free',
    heroSubtitle: 'One-click quality boost — sharpness, detail, clarity',
    tool: UPSCALE,
    toolCta: 'Enhance Photo Free',
    steps: [
      { title: 'Upload Any Photo', desc: 'Low-quality, compressed, old or soft — any JPG, PNG or WebP.' },
      { title: 'AI Processes the Image', desc: 'Neural network enhances sharpness, detail and overall quality.' },
      { title: 'Download Enhanced Version', desc: 'Noticeably better quality — ready for any use.' },
    ],
    content: {
      intro: 'Every photo can be better. Whether it is an old snapshot, a compressed social media image or a slightly soft capture, AI enhancement makes it look sharper, clearer and more professional.',
      sections: [
        {
          h2: 'What Gets Enhanced',
          list: [
            'Edge sharpness — details become crisp and defined.',
            'Texture detail — flat areas gain realistic information.',
            'Noise — grain and digital artifacts are reduced.',
            'Overall clarity — the image looks cleaner and more vivid.',
          ],
        },
        {
          h2: 'Perfect For',
          list: [
            'Old family photos from early digital cameras.',
            'Social media images degraded by platform compression.',
            'Product photos that need a professional edge.',
            'Profile pictures, headshots and portraits.',
            'Screenshots and screen captures.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'How long does enhancement take?', a: 'Most images are processed in 3–5 seconds.' },
      { q: 'Can I enhance multiple photos?', a: 'Yes. Process as many as you want — unlimited, free, no account needed.' },
      { q: 'Does it work on very old photos?', a: 'It improves quality significantly, but severely damaged or faded photos may need additional restoration.' },
    ],
    relatedLinks: upRelated,
  },

  {
    path: '/tools/upscale-image-to-hd',
    title: 'Upscale Image to HD Free Online — AI Upscaler',
    description: 'Upscale images to HD resolution free online. AI-powered — sharp, detailed output, no quality loss, no signup.',
    heroTitle: 'Upscale Image to HD',
    heroSubtitle: 'Convert any image to HD quality — AI-powered, free',
    tool: UPSCALE,
    toolCta: 'Upscale to HD',
    steps: [
      { title: 'Upload Your Image', desc: 'Any small or standard-resolution photo.' },
      { title: 'AI Upscales to HD', desc: 'Neural network generates detail for sharp HD output.' },
      { title: 'Download HD Image', desc: 'Get a 1080p+ resolution image ready for any use.' },
    ],
    content: {
      intro: 'HD (1080p) is the standard for web, social media and most displays. If your image is below HD resolution, our AI upscaler can bring it up to HD quality while preserving sharpness.',
      sections: [
        {
          h2: 'Why HD Matters',
          text: 'HD (1920×1080) is the baseline for modern displays. Images below this resolution look soft and pixelated on phones, laptops and monitors. Upscaling to HD ensures your image looks crisp everywhere.',
        },
        {
          h2: 'When to Upscale to HD',
          list: [
            'Social media — Instagram, Twitter/X and Facebook favor HD images.',
            'Web — hero images and banners should be at least 1080p.',
            'Presentations — HD slides look professional on projectors.',
            'Video thumbnails — YouTube and Vimeo prefer HD.',
          ],
        },
      ],
    },
    faqs: [
      { q: 'What resolution is HD?', a: 'HD is 1920×1080 pixels (1080p). Our upscaler targets this resolution while maintaining aspect ratio.' },
      { q: 'Will a 400px image look good at HD?', a: 'AI adds significant detail, but very small sources have limits. Results are usually much better than traditional upscaling.' },
      { q: 'Is this enough for print?', a: 'HD at 300 DPI gives you roughly a 6×3 inch print. For larger prints, consider upscaling to 4K or 8K.' },
    ],
    relatedLinks: upRelated,
  },
];

export default seoToolPages;
