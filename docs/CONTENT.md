# Content Specification

## Brand

**FADEHOUSE**

Use short, confident, modern copy.

Avoid generic luxury clichés and AI buzzwords.

## Hero Direction

Possible headline direction:

```txt
PRECISION
WITHOUT
COMPROMISE.
```

Alternative directions may be explored, but keep them:
- short,
- memorable,
- specific,
- confident,
- not motivational,
- not SaaS-like.

Supporting copy should explain Fadehouse in plain language.

Example:
> Modern grooming, considered down to the detail. Choose your treatment, reserve your time, and pay when you arrive.

CTA:
- `Book Appointment`
- `View Treatments`

Avoid:
- "Elevate your grooming journey"
- "Where style meets sophistication"
- "Crafted for the modern gentleman"
- "Premium experience redefined"
- "Unlock your best self"

## Treatments

Suggested demo data:

### Signature Haircut
Price: Rp75.000  
Duration: 45 min  
Description:
> A clean Fadehouse cut finished with styling.

### Haircut + Wash
Price: Rp90.000  
Duration: 60 min  
Description:
> Haircut, wash, and finished styling in one appointment.

### Haircut + Beard
Price: Rp110.000  
Duration: 75 min  
Description:
> Haircut paired with precise beard grooming.

### Beard Grooming
Price: Rp55.000  
Duration: 30 min  
Description:
> Shape, clean up, and finish for a sharper beard line.

### Hair Spa
Price: Rp85.000  
Duration: 45 min  
Description:
> A relaxing treatment focused on hair condition and comfort.

### Scalp Detox
Price: Rp100.000  
Duration: 45 min  
Description:
> Deep cleansing treatment for scalp buildup and excess oil.

### Premium Grooming Package
Price: Rp150.000  
Duration: 90 min  
Description:
> A complete grooming session combining core Fadehouse treatments.

## Fadehouse Standard / Experience Section

Focus on tangible service values.

Possible themes:
- attention to detail
- clean process
- considered timing
- consistent finishing
- comfortable local experience

Do not create three generic icon cards titled:
- Quality
- Premium
- Experience

Use stronger layout and real copy instead.

## Booking Steps

### Step 1
Heading:
`Choose Your Treatment`

Support:
> Select one or more treatments. We’ll calculate the total time for you.

### Step 2
Heading:
`Choose a Date`

Support:
> Available dates follow Fadehouse opening hours and current bookings.

### Step 3
Heading:
`Choose a Time`

Support:
> Only times that can fit your full treatment duration are shown.

### Step 4
Heading:
`Your Details`

Fields:
- Full Name
- Phone Number
- Notes — optional

### Step 5
Heading:
`Review Your Appointment`

Show:
- Date
- Start / End
- Treatments
- Duration
- Estimated Total
- Name
- Phone
- Notes

Payment message:
> Payment is made directly at Fadehouse after your appointment.

Primary CTA:
`Confirm Appointment`

## Booking Success

Heading:
`Appointment Confirmed`

Copy:
> Your time is reserved.

Booking ID label:
`Booking ID`

Instruction:
> Save this ID. You’ll need it together with your phone number to manage the appointment later.

Actions:
- `Copy Booking ID`
- `Back to Home`
- optional `Manage Appointment`

Do not say:
- "Email sent"
- "Check your inbox"
- "We sent a confirmation"

## Manage Booking

Heading:
`Manage Appointment`

Support:
> Enter the Booking ID and phone number used when you booked.

Fields:
- Booking ID
- Phone Number

CTA:
`Find Appointment`

Lookup failure:
> We couldn’t find an appointment matching those details.

Do not reveal which field was incorrect.

## Appointment Detail

Show:
- status
- Booking ID
- date
- time
- treatments
- duration
- estimated total

Status labels:
- Confirmed
- Cancelled
- Completed

## Cancellation Modal

Heading:
`Cancel this appointment?`

Body:
> This will release your reserved time.

Actions:
- `Keep Appointment`
- `Cancel Appointment`

After cancellation:
Heading:
`Appointment Cancelled`

Support:
> Your reserved time has been released.

## Availability Errors

Slot race condition:
> 15:30 is no longer available. Choose another available time.

No slots:
> No times are available for this treatment on the selected date.

Closed:
> Fadehouse is closed on this day.

Past date:
> Choose an upcoming date.

## Form Errors

Name:
> Enter your name.

Phone:
> Enter a valid phone number.

Treatment:
> Choose at least one treatment.

Date:
> Choose an appointment date.

Time:
> Choose an available time.

## Loading Copy

Time slots:
`Checking available times…`

Booking submit:
`Confirming your appointment…`

Manage:
`Finding your appointment…`

Cancel:
`Cancelling appointment…`

Keep loading copy short.

## Location / Opening Hours

Use realistic placeholder content until final business data is provided.

Do not invent a real street address and present it as factual.

The coding agent should clearly mark placeholders such as:

```txt
[FADEHOUSE ADDRESS]
[FADEHOUSE PHONE]
[FADEHOUSE INSTAGRAM]
```

## Footer

Include only useful information:
- Fadehouse
- Treatments
- Book Appointment
- Manage Booking
- Opening Hours
- Location
- Instagram/contact placeholder if used

Avoid giant SEO keyword dumps.

## Writing Style Rules

- concise
- human
- confident
- practical
- premium without sounding pretentious
- no emojis in headings
- avoid excessive em dash
- avoid fake claims
- avoid invented awards
- avoid fake testimonials
- avoid fake customer numbers
