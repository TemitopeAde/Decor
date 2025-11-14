# Decor - Premium Interior Design & Furniture

A modern, full-stack e-commerce website for interior decoration and furniture, built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Features

### Frontend
- 🎨 Modern, responsive design with dark/light theme support
- 🔤 Custom fonts (Playfair Display for headings, Inter for body)
- 🏠 Beautiful landing page with hero section and featured products
- 🛍️ Products page with advanced filtering, search, and categories
- 🔍 Quick view modal for products
- 📸 Product detail pages with image sliders
- 🛒 Quote request system (no checkout - request quotes for multiple products)
- 💬 WhatsApp integration for instant quotes
- 📱 Fully responsive design

### Backend
- 🔐 Admin authentication with NextAuth.js
- 📦 Product management dashboard
- 🖼️ Multiple image uploads via Cloudinary
- 📊 PostgreSQL database with Prisma ORM
- 🔒 Secure API routes
- 📝 Quote management system

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS v4
- **Image Storage:** Cloudinary
- **State Management:** Zustand
- **Icons:** React Icons
- **Fonts:** Google Fonts (Playfair Display, Inter)

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image uploads)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Decor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Update the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/decor?schema=public"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # WhatsApp (format: country code + number, e.g., 1234567890)
   NEXT_PUBLIC_WHATSAPP_NUMBER="your-whatsapp-number"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Create an admin user**

   You'll need to create an admin user manually in the database. Here's how:

   ```bash
   # Open Prisma Studio
   npx prisma studio
   ```

   Then create a user with:
   - Email: your-email@example.com
   - Password: (hashed with bcrypt - use an online bcrypt generator)
   - Role: admin

   Or use this Node.js script to create an admin:
   ```javascript
   // scripts/create-admin.js
   const bcrypt = require('bcryptjs');
   const { PrismaClient } = require('@prisma/client');

   const prisma = new PrismaClient();

   async function main() {
     const hashedPassword = await bcrypt.hash('your-password', 10);
     const admin = await prisma.user.create({
       data: {
         email: 'admin@decor.com',
         password: hashedPassword,
         name: 'Admin',
         role: 'admin',
       },
     });
     console.log('Admin created:', admin);
   }

   main()
     .catch(console.error)
     .finally(() => prisma.$disconnect());
   ```

6. **Create sample categories**

   Use Prisma Studio or create them via the database:
   ```sql
   INSERT INTO "Category" (id, name, slug, description) VALUES
   ('cat1', 'Living Room', 'living-room', 'Furniture and decor for living rooms'),
   ('cat2', 'Bedroom', 'bedroom', 'Bedroom furniture and accessories'),
   ('cat3', 'Dining', 'dining', 'Dining room furniture'),
   ('cat4', 'Office', 'office', 'Home office furniture');
   ```

## Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Admin Access

1. Navigate to `/admin/login`
2. Sign in with your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Admin Features:
- Add new products with multiple images
- Edit existing products
- Delete products
- Upload images to Cloudinary
- Manage product inventory
- View quote requests

## Project Structure

```
Decor/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Landing page
│   │   ├── products/             # Products listing & detail
│   │   ├── quote/                # Quote request page
│   │   ├── about/                # About page
│   │   └── contact/              # Contact page
│   ├── admin/                    # Admin section
│   │   ├── login/                # Admin login
│   │   └── dashboard/            # Product management
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth
│   │   ├── products/             # Products API
│   │   ├── categories/           # Categories API
│   │   ├── quotes/               # Quotes API
│   │   ├── upload/               # Cloudinary upload
│   │   └── admin/                # Admin APIs
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── ProductCard.tsx
│   └── QuickViewModal.tsx
├── contexts/                     # React contexts
│   └── ThemeContext.tsx
├── lib/                          # Utilities
│   ├── prisma.ts
│   ├── auth.ts
│   └── cloudinary.ts
├── prisma/                       # Database schema
│   └── schema.prisma
├── store/                        # Zustand stores
│   └── useQuoteStore.ts
└── types/                        # TypeScript types
    └── next-auth.d.ts
```

## Key Features Explained

### Theme System
- Toggle between light and dark mode
- Persists user preference in localStorage
- Smooth transitions between themes
- Custom color variables in CSS

### Product Management
- Multi-image upload with drag & drop
- Image preview and management
- Price and inventory tracking
- Category organization
- Search and filter functionality

### Quote System
- Add products to quote cart
- Specify quantities
- Submit quote requests via form
- Alternative WhatsApp integration
- Persistent cart with Zustand

### Image Handling
- Cloudinary integration for reliable image hosting
- Multiple images per product
- Image optimization and CDN delivery
- Easy upload interface in admin

## Environment Setup

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your `.env` file

### PostgreSQL Setup
1. Install PostgreSQL locally or use a service like:
   - [Railway](https://railway.app)
   - [Supabase](https://supabase.com)
   - [Neon](https://neon.tech)
2. Create a database
3. Add the connection URL to `.env`

### WhatsApp Integration
1. Format: Country code + number (no spaces or special characters)
2. Example: `1234567890` for +1 234-567-8900
3. Users can send quote requests directly to this number

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Ensure Node.js 18+ support
- Set all environment variables
- Run database migrations
- Build and deploy

## Troubleshooting

### Prisma Issues
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### Image Upload Issues
- Check Cloudinary credentials
- Verify file size limits
- Check CORS settings

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check database connection
- Ensure admin user exists

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: info@decor.com

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Prisma for the excellent ORM
- Cloudinary for image management
