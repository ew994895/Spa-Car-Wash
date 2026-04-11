# 💬 CRISP CHAT SETUP GUIDE
**24/7 Customer Support Configuration**

---

## 🎯 WHAT IS CRISP?

Crisp is a free live chat platform that provides 24/7 automated customer support on your website. When configured properly, it can answer common questions even when your business is closed.

**Your Current Setup**: Rule-based (predefined Q&A) - Can upgrade to AI later based on customer data.

---

## 📝 STEP 1: CREATE CRISP ACCOUNT

1. **Go to**: https://crisp.chat/en/
2. **Click**: "Get Started Free"
3. **Sign up** with email: info@spacarwash.com (or your admin email)
4. **Choose plan**: Free (unlimited conversations, 2 operators)
5. **Verify email** and complete setup

---

## 🔑 STEP 2: GET YOUR WEBSITE ID

1. **Log into Crisp**: https://app.crisp.chat/
2. **Click**: "Settings" (gear icon, bottom-left)
3. **Select**: "Websites"
4. **Click**: Your website name (or "Add a website")
5. **Copy**: Website ID (looks like: `a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8`)
6. **Add to code**: Open `/src/app/components/CrispChat.tsx`
7. **Replace**: Line 16: `window.CRISP_WEBSITE_ID = "YOUR_CRISP_WEBSITE_ID";`
8. **With**: `window.CRISP_WEBSITE_ID = "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8";` (your actual ID)

---

## 🤖 STEP 3: CONFIGURE CHATBOT (RULE-BASED)

### **A. Set Up Chatbot Scenarios**

1. **In Crisp Dashboard**: Go to "Chatbox & Email" → "Chatbot"
2. **Click**: "Create a scenario"
3. **Name it**: "Customer Support - FAQ"

### **B. Create Common Questions & Answers**

**Copy these exact scenarios into Crisp**:

---

#### **SCENARIO 1: Service Pricing**

**Trigger**: When visitor asks "price", "cost", "how much", "pricing"

**Response**:
```
We offer several service options:

🚗 TUNNEL WASHES (Drive through):
• Express Wash: $14
• Full Service: $25 (includes interior vacuum)
• Elite Ultimate: $43 (premium detail-level wash)

✨ DETAILING SERVICES (By appointment):
• Mini Detail: $160-$200
• Exterior Detail: $200-$260
• Interior Detail: $220-$280
• Signature Complete: $320-$380 (Most Popular!)
• Rejuvenate Detail: $360-$420
• Cleanse Detail: $475-$550

Would you like to:
[View Wash Packages] → Link to: #packages
[View Detailing Services] → Link to: #detailing
[Book an Appointment] → Link to: #detailing
```

---

#### **SCENARIO 2: Business Hours**

**Trigger**: "hours", "open", "closed", "when are you open"

**Response**:
```
📍 We're located at: 734 Lancaster Ave, Berwyn, PA 19312

⏰ STANDARD HOURS:
Monday - Saturday: 8:00 AM - 6:00 PM
Sunday: 8:00 AM - 5:00 PM

⚠️ Note: Hours may vary due to weather conditions.

Check our current status at the top of our homepage (green = open, red = closed).

Would you like to:
[Call Us Now] → Link to: tel:610-695-0711
[Get Directions] → Link to: https://maps.google.com/?q=734+Lancaster+Ave+Berwyn+PA+19312
[View Homepage] → Link to: /
```

---

#### **SCENARIO 3: Booking Appointments**

**Trigger**: "book", "appointment", "schedule", "reservation"

**Response**:
```
📅 BOOKING AN APPOINTMENT

For detailing services (by appointment):
1. Scroll to our "Detailing Services" section
2. Choose your package
3. Fill out the booking form
4. We'll call you back to confirm!

For tunnel washes:
• No appointment needed - just drive in during business hours!

Would you like to:
[Book Detailing Now] → Link to: #detailing
[See Detailing Packages] → Link to: #detailing
[Call to Schedule] → Link to: tel:610-695-0711
```

---

#### **SCENARIO 4: Membership/Wash Cards**

**Trigger**: "membership", "wash card", "prepaid", "card", "monthly plan"

**Response**:
```
💳 PREPAID WASH CARD PROGRAM

Save money with our prepaid wash cards!

Benefits:
✅ Discounted wash pricing
✅ Priority service
✅ Special detailing rates for members
✅ No expiration on credits

To purchase a wash card:
📞 Call us at 610-695-0711 during business hours

Would you like to:
[Learn More About Membership] → Link to: #membership
[Call to Purchase] → Link to: tel:610-695-0711
[View Wash Packages] → Link to: #packages
```

---

#### **SCENARIO 5: Detailing Inclusions**

**Trigger**: "what's included", "detailing include", "what do you do"

**Response**:
```
✨ DETAILING SERVICES

Each package includes different services. Here's a quick overview:

🔹 MINI DETAIL ($160-$200):
Express wash, polish, wax, interior vacuum, dashboard detail

🔹 EXTERIOR DETAIL ($200-$260):
Complete exterior focus: wash, clay bar, buffing, wax, wheels, chrome

🔹 INTERIOR DETAIL ($220-$280):
Deep interior: steam clean, leather conditioning, all surfaces detailed

🔹 SIGNATURE COMPLETE ($320-$380): ⭐ Most Popular!
Full exterior + interior detail combined

🔹 REJUVENATE ($360-$420):
Luxury vehicle focus with premium products

🔹 CLEANSE ($475-$550):
Deep restoration + pickup/delivery included

Would you like to:
[See Full Package Details] → Link to: #detailing
[Book an Appointment] → Link to: #detailing
[Talk to a Person] → Link to: tel:610-695-0711
```

---

#### **SCENARIO 6: General Questions**

**Trigger**: "hello", "hi", "help", "question"

**Response**:
```
👋 Hi there! Welcome to Spa Car Wash & Detailing Center!

I can help you with:

💰 Service Pricing
⏰ Business Hours
📅 Booking Appointments
💳 Membership Cards
✨ What's Included in Detailing
📞 Contact Information

What can I help you with today?

Or, would you like to:
[Talk to a Person] → Link to: tel:610-695-0711
[Browse Services] → Link to: /
```

---

#### **SCENARIO 7: Contact Info**

**Trigger**: "contact", "phone", "email", "address", "location"

**Response**:
```
📞 CONTACT US

Phone: 610-695-0711
Email: info@spacarwash.com
Address: 734 Lancaster Ave, Berwyn, PA 19312

⏰ Hours:
Mon-Sat: 8 AM - 6 PM
Sunday: 8 AM - 5 PM

Would you like to:
[Call Now] → Link to: tel:610-695-0711
[Send Email] → Link to: mailto:info@spacarwash.com
[Get Directions] → Link to: https://maps.google.com/?q=734+Lancaster+Ave+Berwyn+PA+19312
[Visit Help Section] → Link to: #help
```

---

### **C. Set Up Fallback Response**

**When chatbot doesn't understand**:

```
I'm not sure I understand that question. 

Here's what I can help with:
• Service pricing
• Business hours
• Booking appointments
• Membership info
• Contact information

Or, you can:
📞 Call us: 610-695-0711
📧 Email: info@spacarwash.com
🌐 Browse our website sections below

Would you like to speak with a person?
```

---

## 🎨 STEP 4: CUSTOMIZE APPEARANCE

### **A. Brand Colors**

1. Go to: Settings → Chatbox → Appearance
2. **Primary Color**: `#3B82F6` (blue - matches your website)
3. **Chat Bubble Color**: `#3B82F6`
4. **Text Color**: `#FFFFFF` (white)

### **B. Welcome Message**

Settings → Chatbox → Welcome Message:

```
👋 Hi! How can we help you today?

Ask me about:
• Pricing & Services
• Business Hours
• Appointments
• Membership Cards
```

### **C. Position**

- **Position**: Bottom-right
- **Offset**: Default
- **Hide on mobile**: No (keep visible)

---

## ⚙️ STEP 5: ADVANCED SETTINGS

### **A. Availability**

Settings → Availability:

**Set your actual business hours**:
- Monday: 8:00 AM - 6:00 PM
- Tuesday: 8:00 AM - 6:00 PM
- Wednesday: 8:00 AM - 6:00 PM
- Thursday: 8:00 AM - 6:00 PM
- Friday: 8:00 AM - 6:00 PM
- Saturday: 8:00 AM - 6:00 PM
- Sunday: 8:00 AM - 5:00 PM

**Away Message** (when you're offline):
```
We're currently closed, but our chatbot is here 24/7 to answer your questions!

For immediate assistance, you can also:
📞 Leave a voicemail: 610-695-0711
📧 Email us: info@spacarwash.com

We'll respond during business hours.
```

### **B. Email Notifications**

Settings → Email:

- ✅ Enable email notifications for new conversations
- ✅ Send to: info@spacarwash.com
- ✅ Daily summary of conversations

---

## 📱 STEP 6: MOBILE APP (OPTIONAL)

Download Crisp mobile app to respond on-the-go:
- **iOS**: App Store → Search "Crisp"
- **Android**: Google Play → Search "Crisp"

**Login** with your Crisp account to answer customer questions from your phone.

---

## 🧪 STEP 7: TEST YOUR CHATBOT

1. **Visit your website** in incognito/private window
2. **Click chat bubble** (bottom-right)
3. **Test questions**:
   - "How much is a detail?"
   - "Are you open now?"
   - "Can I book an appointment?"
   - "Tell me about membership"
4. **Verify responses** match what you configured
5. **Check links** work correctly

---

## 📊 STEP 8: MONITOR PERFORMANCE

### **Weekly Checklist**:

1. **Log into Crisp Dashboard**
2. **Check "Conversations"** - Review customer questions
3. **Look for patterns** - Are customers asking questions the bot can't answer?
4. **Update scenarios** - Add new Q&A based on common questions
5. **Respond to missed questions** - Reply to any unanswered chats

### **Monthly Review**:

- **Analyze top questions** - What do customers ask most?
- **Update chatbot scenarios** - Add new FAQs
- **Check response quality** - Are answers still accurate?
- **Update pricing/hours** - Keep info current

---

## 🚀 UPGRADE TO AI (FUTURE)

Once you collect data on customer questions (3-6 months):

1. **Crisp AI Plugin**: Enable AI assistant in settings
2. **Feed it your FAQ data** from collected conversations
3. **Train it on your services** using website content
4. **Test AI responses** before going live
5. **Hybrid mode**: AI + rule-based (best of both)

**Cost**: Crisp AI starts at $25/month (optional upgrade)

---

## ⚠️ TROUBLESHOOTING

**Chat widget not appearing?**
- Check that you replaced "YOUR_CRISP_WEBSITE_ID" with actual ID
- Clear browser cache and refresh
- Check browser console for errors

**Chatbot not responding?**
- Verify scenarios are published (not in draft)
- Check trigger keywords match customer questions
- Test in incognito mode

**Can't log into Crisp?**
- Reset password at: https://app.crisp.chat/
- Check spam folder for verification email

---

## 📞 SUPPORT

**Crisp Support**:
- Help Center: https://help.crisp.chat/
- Email: support@crisp.chat
- Chat: Available in Crisp dashboard

**Website Integration Issues**:
- Check `/src/app/components/CrispChat.tsx`
- Contact web developer if code changes needed

---

**Setup Time**: ~30-45 minutes  
**Last Updated**: April 9, 2026  
**Status**: Ready for configuration
