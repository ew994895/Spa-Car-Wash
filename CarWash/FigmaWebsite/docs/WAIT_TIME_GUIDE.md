# 🕒 Wait Time System - Complete Guide

## Overview
The Wait Time System allows staff to display real-time wait time estimates for Hand Wash, Elite Wash, and Detail Services. This helps set customer expectations and promotes the Hand Wash service.

---

## 🎯 Quick Start

### **Access the Admin Panel**
- **Keyboard Shortcut**: Press `Ctrl + Shift + X` anywhere on the website
- An admin panel will appear where you can configure wait times

### **Initial Setup (First Time)**
1. Press `Ctrl + Shift + X` to open Wait Time Manager
2. **Hand Wash is enabled by default** (this is your primary promotional focus)
3. Set the current wait time in minutes (e.g., 30, 45, 60)
4. Select traffic level: Low, Medium, High, or Very High
5. Click **Save Changes**
6. The wait time now displays in:
   - Header badge (next to logo)
   - Detail Services section widget

---

## 📊 Service Wait Times

### **🚿 Hand Wash** (Enabled by Default - PRIMARY)
- **Purpose**: Promote premium hand wash service in detail bay
- **Pricing**: Sedan $60 | SUV $80
- **Default Status**: ✅ Enabled (start showing this immediately)
- **Typical Wait Times**:
  - Low Traffic: 15-30 minutes
  - Medium Traffic: 30-60 minutes
  - High Traffic: 60-90 minutes
  - Very High Traffic: 90+ minutes

### **⚡ Elite Wash** (Disabled by Default - OPTIONAL)
- **Purpose**: Show wait time for premium tunnel wash
- **Default Status**: ❌ Disabled (enable when ready)
- **Typical Wait Times**:
  - Low Traffic: 10-15 minutes
  - Medium Traffic: 15-20 minutes
  - High Traffic: 20-30 minutes
  - Very High Traffic: 30+ minutes
- **Note**: Normal wait when not busy is 10-20 minutes

### **✨ Detail Services** (Disabled by Default - OPTIONAL)
- **Purpose**: Show estimated completion time for full detail packages
- **Default Status**: ❌ Disabled (enable when ready)
- **Typical Wait Times**:
  - Low Traffic: 240-360 minutes (4-6 hours)
  - Medium Traffic: 360-480 minutes (6-8 hours)
  - High Traffic: 480+ minutes (8+ hours - "all day")
  - Very High Traffic: Next day
- **Note**: Usually takes all day; customers are notified when complete early

---

## 🖥️ Display Locations

### **1. Header Badge (Next to Logo)**
- **Desktop Only**: Shows on screens 768px and wider
- **Compact Design**: Pill-shaped badge with:
  - Pulsing colored dot (traffic indicator)
  - Clock icon
  - Service name + wait time
- **Priority Order**: 
  1. Hand Wash (if enabled)
  2. Elite Wash (if Hand Wash disabled)
  3. Detail Services (if others disabled)

### **2. Detail Services Section Widget**
- **Location**: Top of Detailing Services section, before tabs
- **Full Display**: Shows all enabled services with:
  - Modern progress bars
  - Traffic level indicators
  - Detailed time breakdowns
  - Last updated timestamp
- **Mobile Responsive**: Stacks vertically on small screens

---

## 🎨 Traffic Levels & Colors

### **🟢 Low Traffic (25% bar fill)**
- **Color**: Green
- **Icon**: Trending Down ↓
- **Use When**: Business is quiet, minimal wait
- **Customer Impact**: "Come now, short wait!"

### **🟡 Moderate Traffic (50% bar fill)**
- **Color**: Yellow
- **Icon**: Minus −
- **Use When**: Normal business level, average wait
- **Customer Impact**: "Plan ahead slightly"

### **🟠 High Traffic (75% bar fill)**
- **Color**: Orange
- **Icon**: Trending Up ↑
- **Use When**: Busy period, longer than usual wait
- **Customer Impact**: "Expect delays"

### **🔴 Very High Traffic (100% bar fill)**
- **Color**: Red
- **Icon**: Trending Up ↑
- **Use When**: Extremely busy, maximum wait time
- **Customer Impact**: "Consider coming later"

---

## 📱 Admin Panel Features

### **Service Controls**
Each service has:
- ✅ **Enable/Disable Toggle**: Show or hide wait time
- ⏱️ **Wait Time Input**: Set minutes (0-180)
- 🎨 **Traffic Level Buttons**: Low/Medium/High/Very High
- 👁️ **Live Preview**: See how it looks before saving

### **Display Settings**
- ☑️ **Show in Header**: Display badge next to logo
- ☑️ **Show in Detail Section**: Display widget in services area
- Both are enabled by default

### **Action Buttons**
- 💾 **Save Changes**: Apply settings immediately
- 🗑️ **Reset to Defaults**: Return to factory settings
- ❌ **Close (X)**: Exit without saving changes

---

## 🚀 Usage Workflow

### **Updating Wait Times Throughout the Day**

#### **Morning Opening (9:00 AM)**
1. Press `Ctrl + Shift + X`
2. Set Hand Wash: 20 minutes, Low Traffic
3. Save Changes
4. Badge appears: "Hand Wash: 20 min" 🟢

#### **Lunch Rush (12:00 PM)**
1. Press `Ctrl + Shift + X`
2. Update Hand Wash: 45 minutes, Medium Traffic
3. Save Changes
4. Badge updates: "Hand Wash: 45 min" 🟡

#### **Afternoon Slow Period (2:00 PM)**
1. Press `Ctrl + Shift + X`
2. Update Hand Wash: 15 minutes, Low Traffic
3. Save Changes
4. Badge updates: "Hand Wash: 15 min" 🟢

#### **Late Afternoon Busy (4:30 PM)**
1. Press `Ctrl + Shift + X`
2. Update Hand Wash: 75 minutes, High Traffic
3. Save Changes
4. Badge updates: "Hand Wash: 1h 15m" 🟠

#### **Closing Soon (4:45 PM)**
1. Press `Ctrl + Shift + X`
2. Disable Hand Wash (uncheck "Enabled")
3. Save Changes
4. Wait time badge disappears

---

## 💡 Pro Tips

### **For Maximum Impact**
1. **Update Regularly**: Change wait times at least 3-4 times per day
2. **Be Accurate**: Customers trust realistic estimates
3. **Start with Hand Wash Only**: Get comfortable before enabling others
4. **Use as Promotion**: "Only 20 min wait for Hand Wash!" attracts customers

### **Strategic Wait Time Communication**
- **Low Wait (< 30 min)**: Encourages immediate visit
- **Medium Wait (30-60 min)**: Customers can plan errands nearby
- **High Wait (60+ min)**: Set expectations, reduce complaints
- **Very High Wait**: Suggests booking appointments instead

### **When to Enable Elite Wash Display**
- After successfully running Hand Wash display for 2+ weeks
- When you have consistent data on Elite Wash wait times
- To differentiate between tunnel and detail bay services

### **When to Enable Detail Services Display**
- When appointment book is consistently full
- To manage customer expectations for same-day details
- To encourage advance booking

---

## 🔧 Technical Details

### **Data Storage**
- All wait time settings saved to browser `localStorage`
- Key: `spa-wait-time-data`
- Persists between page refreshes
- Automatically loads on page load

### **Real-Time Updates**
- Changes broadcast via custom `waitTimeUpdated` event
- All displays update instantly when admin saves
- No page refresh required

### **Default Settings**
```javascript
{
  handWash: {
    enabled: true,        // ✅ ON by default
    waitTime: 30,         // 30 minutes
    traffic: 'low'        // Green indicator
  },
  eliteWash: {
    enabled: false,       // ❌ OFF by default
    waitTime: 15,
    traffic: 'low'
  },
  detailServices: {
    enabled: false,       // ❌ OFF by default
    waitTime: 480,        // 8 hours
    traffic: 'low'
  },
  showInHeader: true,
  showInDetailSection: true
}
```

---

## 🎓 Training Checklist

### **Staff Training Steps**
- [ ] Show staff the `Ctrl + Shift + X` shortcut
- [ ] Explain traffic level meanings (Low/Med/High/Very High)
- [ ] Practice updating wait times 3-4 times
- [ ] Demonstrate how changes appear on customer view
- [ ] Assign responsibility for daily updates
- [ ] Set reminder schedule (morning, lunch, afternoon)

### **Manager Checklist**
- [ ] Review wait time data weekly
- [ ] Adjust traffic level guidelines based on patterns
- [ ] Consider enabling Elite Wash after 2 weeks
- [ ] Monitor customer feedback about accuracy
- [ ] Use data to staff appropriately during busy times

---

## 📋 Troubleshooting

### **Wait time not showing?**
✅ Check that service is enabled in admin panel
✅ Verify "Show in Header" or "Show in Detail Section" is checked
✅ Make sure you clicked "Save Changes"

### **Changes not appearing?**
✅ Wait 1-2 seconds after saving (broadcasts update)
✅ Try refreshing the page
✅ Clear browser cache if issue persists

### **Badge shows wrong service?**
✅ Check priority order (Hand > Elite > Detail)
✅ Disable higher priority service to show lower one
✅ Only one service displays in header badge

### **Lost all settings?**
✅ Click "Reset to Defaults" to restore factory settings
✅ Hand Wash will be re-enabled at 30 min, Low Traffic

---

## 📞 Support

### **Quick Reference**
- **Admin Access**: `Ctrl + Shift + X`
- **Default Service**: Hand Wash (enabled)
- **Display Locations**: Header + Detail Section
- **Update Frequency**: 3-4 times daily recommended

### **Need Help?**
Contact your website administrator or refer to main documentation at `/ADMIN_DOCUMENTATION.md`

---

## 🎯 Success Metrics

### **Track These KPIs**
- Number of Hand Wash bookings (should increase)
- Customer complaints about wait times (should decrease)
- Accuracy of time estimates (aim for 90%+ accurate)
- Staff compliance with updating system (daily updates?)

### **Goal: Hand Wash Promotion**
The wait time system is designed primarily to **promote Hand Wash services** by:
1. Making them visible in header
2. Showing competitive wait times
3. Creating urgency when times are low
4. Setting expectations when times are high

**Success = More Hand Wash customers who are satisfied with their wait time!**

---

*Last Updated: April 9, 2026*
*Version: 1.0*