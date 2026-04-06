# 🐄 Shree Gau Dham Gaushala Website

A beautiful, fully responsive website for **Shree Gau Dham Gaushala** — a sanctuary for the protection and care of sacred cows.

---

## 📁 File Structure

```
gaushala-website/
├── index.html          ← Main website (single page)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── script.js       ← Interactivity, animations, donation logic
├── images/             ← Add your own photos here (see below)
│   ├── hero-bg.jpg     ← Hero background (recommended: 1920×1080)
│   ├── cow1.jpg        ← Gallery image 1 (tall)
│   ├── cow2.jpg        ← Gallery image 2
│   ├── cow3.jpg        ← Gallery image 3
│   ├── cow4.jpg        ← Gallery image 4 (wide)
│   └── cow5.jpg        ← Gallery image 5
└── README.md
```

---

## 🚀 How to Deploy on GitHub Pages

1. **Create a new GitHub repository** (e.g. `gaushala-website`)
2. **Upload all files** keeping the folder structure intact
3. Go to **Settings → Pages**
4. Under "Source", select **main branch / root**
5. Click **Save** — your site will be live at:
   `https://yourusername.github.io/gaushala-website/`

---

## 🛠 Customisation Guide

### 1. Change the Gaushala Name
Search and replace `Shree Gau Dham Gaushala` in `index.html` with your actual gaushala name.

### 2. Update Contact Details
In `index.html`, find the `<section class="contact">` block and update:
- Address
- Phone numbers
- Email addresses
- Visiting hours

### 3. Add Your Photos
Place your photos in the `images/` folder with these exact names, OR update the filenames in `index.html`:
| File | Section | Notes |
|------|---------|-------|
| `hero-bg.jpg` | Hero banner | Wide landscape, 1920×1080 |
| `cow1.jpg` | Gallery | Portrait/tall image |
| `cow2.jpg` | Gallery | Square/landscape |
| `cow3.jpg` | Gallery | Square/landscape |
| `cow4.jpg` | Gallery | Wide/landscape |
| `cow5.jpg` | Gallery | Square/landscape |

### 4. Update Bank & Payment Details
In `index.html`, find the **Bank Details** section and update:
- UPI ID
- Account number, IFSC, bank name
- QR code image

### 5. Integrate a Payment Gateway
In `js/script.js`, find the comment block inside the `donateBtn` click handler and replace it with:

#### Razorpay (Recommended for India)
```html
<!-- Add this in <head> -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```
```javascript
// In script.js, replace the openModal() call with:
const options = {
  key: 'YOUR_RAZORPAY_KEY_ID',
  amount: amount * 100, // in paise
  currency: 'INR',
  name: 'Shree Gau Dham Gaushala',
  description: 'Gau Seva Donation',
  handler: function(response) {
    openModal(); // show thank you
  },
  prefill: { name: '', email: '', contact: '' },
  theme: { color: '#E8651A' }
};
new Razorpay(options).open();
```

#### Contact Form (Formspree - Free)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your endpoint
3. Update the form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Remove the `id="contactForm"` and let Formspree handle submissions.

### 6. Update Social Media Links
Find the `.social-links` section in `index.html` and replace `href="#"` with your actual social media URLs.

### 7. Update 80G Registration Number
Find `Reg. No. XXXXXX` in the footer and replace with your actual NGO registration number.

---

## 🎨 Colour Customisation

All colours are CSS variables in `css/style.css` at the top:

```css
:root {
  --saffron: #E8651A;     /* Primary orange-saffron */
  --gold: #C9922A;        /* Gold accents */
  --brown: #5C3A1E;       /* Dark earthy brown */
  --green: #4A7C59;       /* Nature green */
  --cream: #FDF6EC;       /* Background cream */
}
```

---

## ✅ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Animated statistics counter
- ✅ Donation amount selector
- ✅ Floating donate button
- ✅ Contact form
- ✅ Gallery with hover effects
- ✅ Testimonials section
- ✅ Bank transfer & UPI payment info
- ✅ 80G tax exemption mention
- ✅ Scroll-reveal animations
- ✅ Mobile hamburger menu
- ✅ Thank-you modal after donation

---

## 📞 Support

For help customising this website, feel free to open an issue on GitHub.

**Jay Gau Mata! 🐄**
