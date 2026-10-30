export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  closing?: string[];
};

export type LegalDocument = {
  title: string;
  effectiveDate: string;
  introduction: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "30 October 2026",
  introduction:
    "This Privacy Policy explains how R.V.B Tech (“we”, “us” or “our”) handles personal information when you visit rvbtech.com.np or contact us through the website. Please read it together with our Terms and Conditions.",
  sections: [
    {
      heading: "1. Who we are",
      paragraphs: [
        "R.V.B Tech provides plumbing, electrical and related services in Nepal. For privacy questions or requests about personal information, contact us at rvbtech10@gmail.com or Saptakhel-9, Lalitpur.",
      ],
    },
    {
      heading: "2. Information we may collect",
      paragraphs: ["Depending on the features you use, we may collect:"],
      list: [
        "Contact details you choose to provide, such as your name, phone number and email address.",
        "Enquiry details, such as the service you are interested in, your message, preferred appointment time, and information you choose to share about the job or property.",
        "Communications you send us and our replies, including information needed to respond to or manage your enquiry.",
        "Basic technical information that may be provided by your browser or hosting provider, such as IP address, device/browser type, pages requested and access times, where these logs are generated.",
      ],
      closing: [
        "Please do not submit passwords, payment-card details, government identification numbers, or other sensitive information through a general website enquiry form unless we specifically request it through an appropriate channel.",
      ],
    },
    {
      heading: "3. How we use information",
      paragraphs: [
        "We may use the information above to:",
        "We will not use enquiry details for unrelated marketing unless we have an appropriate basis to do so and, where required, have obtained your consent.",
      ],
      list: [
        "Respond to questions and service enquiries.",
        "Discuss requirements, prepare estimates or quotations, schedule visits, and communicate about requested work.",
        "Maintain website security, diagnose errors and improve website functionality.",
        "Keep appropriate business records and handle complaints, disputes or legal obligations.",
      ],
    },
    {
      heading: "4. How enquiries are handled",
      paragraphs: [
        "If you submit a contact form, the details you provide are sent to our business email through our email provider. If you provide an email address, we also ask the email provider to send a copy of your enquiry to that address. Messages may be retained in the email accounts used to send and receive them.",
      ],
    },
    {
      heading: "5. Sharing information",
      paragraphs: [
        "We do not sell personal information. We may share limited information when reasonably necessary with:",
      ],
      list: [
        "Service providers that host the website, deliver form messages, provide security/anti-spam tools, or support website functionality.",
        "Workers or subcontractors who need relevant job details to assess, schedule or carry out work, where appropriate.",
        "Public authorities, regulators, courts or professional advisers where required by law or necessary to establish, exercise or defend legal claims.",
      ],
      closing: [
        "Third-party providers may process information under their own terms and privacy notices. We aim to share only information reasonably needed for the relevant purpose.",
      ],
    },
    {
      heading: "6. Cookies, analytics and embedded content",
      paragraphs: [
        "The website or its hosting provider may use essential technical storage or logs needed for security and operation. If we add analytics, advertising tools or other non-essential tracking, this policy should be updated to describe those tools and any consent choices required by applicable law.",
        "Pages may include embedded content or links from third parties, such as YouTube videos or social media. When you interact with embedded content, the third party may collect information about your browser or activity under its own privacy policy. If practical, configure embeds to limit unnecessary data collection and verify their current behaviour before publication.",
      ],
    },
    {
      heading: "7. Retention and security",
      paragraphs: [
        "We keep enquiry information only for as long as reasonably needed to respond, manage a service relationship, maintain business records, resolve disputes or meet applicable legal requirements. Retention periods depend on the type of information and circumstances.",
        "We use reasonable measures intended to protect information, but no website, email transmission or storage system can be guaranteed completely secure. Please contact us promptly if you believe information sent to us has been exposed or misused.",
      ],
    },
    {
      heading: "8. Your choices and requests",
      paragraphs: [
        "You may contact us to ask what personal information you have provided, request correction of inaccurate information, or ask us to delete information where appropriate. We may need to retain some records for legitimate business, safety or legal reasons. We will consider requests in accordance with applicable law and may need to verify your identity before acting.",
      ],
    },
    {
      heading: "9. Children",
      paragraphs: [
        "Our website and services are not specifically directed to children. Please do not submit a child’s personal information unless it is necessary for an enquiry and you are authorised to provide it.",
      ],
    },
    {
      heading: "10. Links to other websites",
      paragraphs: [
        "Our website may link to third-party websites. We do not control their content or privacy practices. Review the relevant third party’s policies before sharing information with them.",
      ],
    },
    {
      heading: "11. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy when our website, services or data practices change. We will publish the updated version on this page and revise the effective date. Please check this page periodically.",
      ],
    },
    {
      heading: "12. Contact",
      paragraphs: [
        "For privacy questions or requests, contact:",
        "R.V.B Tech",
        "Email: rvbtech10@gmail.com",
        "Address: Saptakhel-9, Lalitpur",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  effectiveDate: "30 October 2026",
  introduction:
    "These Terms and Conditions apply to your use of rvbtech.com.np (the “website”), operated by R.V.B Tech (“we”, “us” or “our”). By using the website, you agree to these terms. If you do not agree, please do not use the website.",
  sections: [
    {
      heading: "1. About the website",
      paragraphs: [
        "The website provides information about R.V.B Tech and allows visitors to contact us about plumbing, electrical and related services in Nepal. Website content is provided for general information and may not describe every condition or requirement for a particular job.",
      ],
    },
    {
      heading: "2. Enquiries are not confirmed bookings",
      paragraphs: [
        "Submitting a contact form, calling, emailing or messaging us does not by itself create a confirmed appointment, service contract or obligation to perform work. A job is confirmed only when the scope, price or pricing method, timing and other material conditions have been agreed by the customer and R.V.B Tech through an appropriate written or otherwise clearly documented arrangement.",
      ],
    },
    {
      heading: "3. Quotes, estimates and changes",
      paragraphs: [
        "Any estimate or quotation will be based on the information available at the time and may depend on an inspection, measurements, access, materials, existing site conditions and the customer’s requirements. Unless a quotation expressly says otherwise, it is not a guarantee that concealed or unforeseen problems will not affect the final price or scope.",
        "We will aim to explain material changes to the scope, cost or timing and seek the customer’s agreement before proceeding with additional work, except where urgent action is reasonably necessary to address an immediate safety risk and the circumstances permit such action. The final agreed quotation, work order or service agreement takes precedence over general website descriptions for that specific job.",
      ],
    },
    {
      heading: "4. Customer responsibilities",
      paragraphs: [
        "Customers should provide accurate information about the job, disclose known hazards or relevant existing problems, arrange lawful access to the work area, and identify any relevant property or building requirements. Customers are responsible for obtaining permissions or approvals that the law or the agreed service arrangement places on them. R.V.B Tech and the customer should agree in advance who will supply materials, arrange access, and handle disposal or reinstatement where relevant.",
      ],
    },
    {
      heading: "5. Workmanship, materials and warranty",
      paragraphs: [
        "The scope and standard of each job should be agreed before work begins. Any warranty, service guarantee, materials warranty, duration, exclusions and claim procedure must be stated in the quotation, invoice, job sheet or separate written warranty applicable to that job.",
        "Unless expressly agreed in writing, this website does not create a universal warranty period or promise that every part, product or existing installation is covered. Manufacturer warranties may be subject to the manufacturer’s terms. Customers should report suspected workmanship issues promptly and provide reasonable access for inspection.",
        "Nothing in these terms is intended to exclude rights or remedies that cannot lawfully be excluded under applicable law.",
      ],
    },
    {
      heading: "6. Safety and access",
      paragraphs: [
        "Work may depend on safe access, suitable working conditions and the availability of utilities or other facilities. If a site presents an immediate hazard, unsafe conditions, restricted access or circumstances outside our reasonable control, work may need to be paused, rescheduled or reassessed. We will communicate material concerns and next steps as reasonably practicable.",
      ],
    },
    {
      heading: "7. Website content and intellectual property",
      paragraphs: [
        "Unless stated otherwise, the website’s text, branding, graphics, photographs, videos and other content are owned by R.V.B Tech or used with permission. You may view the website for personal, non-commercial information. You must not copy, republish, modify, distribute or commercially use website content without permission, except where permitted by law.",
        "Photographs and project examples are illustrative. Actual results, materials, finishes and site conditions may vary. Do not rely on an image or general description as a substitute for a job-specific inspection or written specification.",
      ],
    },
    {
      heading: "8. Acceptable use",
      paragraphs: [
        "You must not misuse the website, attempt unauthorised access, interfere with its operation, introduce malicious code, submit knowingly false or unlawful content, or use the website to infringe another person’s rights. We may take reasonable steps to protect the website and its users from misuse.",
      ],
    },
    {
      heading: "9. Third-party services and links",
      paragraphs: [
        "The website may link to or display content hosted by third parties, such as maps, video platforms or social media. Those services are operated independently and may be governed by their own terms and privacy policies. We are not responsible for third-party websites or services to the extent permitted by applicable law.",
      ],
    },
    {
      heading: "10. Availability and accuracy",
      paragraphs: [
        "We aim to keep the website information accurate and available, but we do not guarantee that every page is complete, current, uninterrupted or error-free. We may update, suspend or remove website content or features without notice where reasonably necessary.",
      ],
    },
    {
      heading: "11. Liability",
      paragraphs: [
        "To the extent permitted by applicable law, R.V.B Tech is not responsible for losses arising solely from reliance on general website information, temporary website unavailability, or third-party content outside our reasonable control. These terms do not exclude or limit liability for fraud, wilful misconduct, negligence, personal injury, property damage, consumer rights, or any other liability that cannot legally be excluded or limited.",
        "For actual service work, responsibility and remedies will be determined by the agreed job documents and applicable law, taking into account the circumstances and the parties’ legal rights.",
      ],
    },
    {
      heading: "12. Privacy",
      paragraphs: [
        "Personal information submitted through the website is handled as described in our Privacy Policy. Please read that policy before submitting personal information.",
      ],
    },
    {
      heading: "13. Changes to these terms",
      paragraphs: [
        "We may revise these terms as the website or our services change. The revised version will be published on this page with an updated effective date. Changes to an existing customer’s agreed job will not automatically alter the specific terms already agreed for that job unless the parties agree otherwise or applicable law requires it.",
      ],
    },
    {
      heading: "14. Applicable law and disputes",
      paragraphs: [
        "These terms are intended to operate consistently with the laws applicable in Nepal. If a concern arises, the parties should first try to resolve it through good-faith communication. Nothing in this section removes any right to use a competent court, regulator, consumer-protection mechanism or other remedy available under applicable law.",
      ],
    },
    {
      heading: "15. Contact",
      paragraphs: [
        "For questions about these terms or the website, contact:",
        "R.V.B Tech",
        "Email: rvbtech10@gmail.com",
        "Address: Saptakhel-9, Lalitpur",
      ],
    },
  ],
};
