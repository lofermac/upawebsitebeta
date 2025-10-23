"use client";

import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import { Shield, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <HeaderWithAuth />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-32 pb-24 flex-1 z-10">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#077124]/20 to-emerald-500/10 border border-[#077124]/20 mb-6">
              <Shield className="h-8 w-8 text-[#077124]" strokeWidth={2} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ 
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.01em'
                }}>
              Privacy Policy
            </h1>
          </div>

          {/* Privacy Content */}
          <div className="relative group">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem]"></div>
            <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50"></div>
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-10 space-y-8">
              
              {/* Effective Date and Company Info */}
              <section className="space-y-3 text-center border-b border-white/10 pb-6">
                <p className="text-base text-gray-400 leading-relaxed">
                  <strong>Effective date: April 25, 2018</strong>
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Universal Affiliates Ltd (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the website (the &quot;Service&quot;).
                </p>
              </section>
              
              {/* Introduction */}
              <section className="space-y-3">
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Data protection is taken very seriously by Universal Affiliates Ltd. The processing of personal data is necessary for the Service to function. We therefore request consent from the data subject during the registration process.
                  </p>
                  <p>
                    The processing of personal data shall always be in line with the General Data Protection Regulation (GDPR), and in accordance with the country specific data protection regulations applicable.
                  </p>
                  <p>
                    This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                  </p>
                  <p>
                    We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from here
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Definitions
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Personal Data</h3>
                    <p>Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Usage Data</h3>
                    <p>Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Cookies</h3>
                    <p>Cookies are small pieces of data stored on a User&apos;s device.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Controller</h3>
                    <p>Data Controller means a person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Processor (Or Service Providers)</h3>
                    <p>Data Processor (or Service Provider) means any person (other than an employee of the Data Controller) who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Subject</h3>
                    <p>Data Subject is any living individual who is the subject of Personal Data.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">User</h3>
                    <p>The User is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Consent</h3>
                    <p>Consent of the data subject is any freely given, specific, informed and unambiguous indication of the data subject&apos;s wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her.</p>
                  </div>
                </div>
              </section>

              {/* Contact Details */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Contact Details
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed">
                  <p><strong>Full Name Of Legal Identity:</strong> Universal Affiliated Ltd</p>
                  <p><strong>Email Address:</strong> Support@universalpoker.com</p>
                  <p><strong>Postal Address:</strong> Sutherland House, 1759 London Road, Leigh-On-Sea, Essex, SS9 2RZ</p>
                </div>
              </section>

              {/* Data Collection and Use */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Data Collection and Use
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
              </section>

              {/* Types of Data Collected */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Types of Data Collected
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                  
                  <p><strong>Identity Data</strong> includes first name, last name, username or similar identifier and poker room identifier.</p>
                  
                  <p><strong>Contact Data</strong> includes billing address, delivery address and email address.</p>
                  
                  <p><strong>Financial Data</strong> includes bank account and other payment service providers for payment.</p>
                  
                  <p><strong>Technical And Usage Data</strong> We may also collect information on how the Service is accessed and used (&quot;Usage Data&quot;). This Usage Data may include information such as your computer&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                  
                  <p><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</p>
                  
                  <p><strong>Marketing And Communications Data</strong> includes your preferences in receiving marketing from us and your communication preferences.</p>
                </div>
              </section>

              {/* Cookies Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Cookies Data
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                  </p>
                  <p>
                    Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyse our Service.
                  </p>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                  </p>
                  <p>Examples of Cookies we use:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
                    <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                    <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
                  </ul>
                </div>
              </section>

              {/* How Is Your Data Collected */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  How Is Your Data Collected?
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>We use different methods to collect data from and about you including through:</p>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Direct Interactions</h3>
                    <p>You may give us your Identity, Contact, or Financial Data by filling in forms (for example, application forms and contact us forms on our website) or by corresponding with us by post, email or otherwise.</p>
                    <p>By giving us your data through these methods, you agree that Universal Affiliated Ltd can contact you about relevant information pertaining to being a member of Universal Affiliated Ltd.</p>
                    <p>Universal Affiliated Ltd will NEVER sell or share your contact details with external parties.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Automated Technologies Or Interaction</h3>
                    <p>As you interact with our Service, we may automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Essential Third Parties</h3>
                    <p>In order to facilitate our services, we may receive and share personal data about you from various essential third parties as set out below:</p>
                    <p>Technical, Transactional and Contact Data from the following parties:</p>
                    <p>a) Affiliate Networks based both inside and outside the EU</p>
                  </div>
                </div>
              </section>

              {/* Mailing List and Email Communications */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Mailing List and Email Communications
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    When you subscribe to our mailing list, we collect your full name, email address, and country.
                  </p>
                  <p>We use this information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Identify who we&apos;re contacting.</li>
                    <li>Send you relevant promotions, partner offers, and updates about Universal Poker.</li>
                    <li>Ensure that promotions are appropriate for your location, as some offers may have regional restrictions.</li>
                  </ul>
                  <p>
                    We rely on your consent as the lawful basis for this processing.
                  </p>
                  <p>
                    You provide this consent when you opt in to our mailing list on our website.
                  </p>
                  <p>
                    You can withdraw your consent at any time by clicking the unsubscribe link in any email you receive from us. Once you unsubscribe, you will no longer receive marketing communications from us.
                  </p>
                  <p>
                    We use SendinBlue (Brevo) to manage and send our email campaigns. SendinBlue acts as our data processor, handling your information on our behalf and in accordance with their own privacy and security policies.
                  </p>
                  <p>
                    We also securely store subscriber data in Supabase, which we use to manage our database and website infrastructure.
                  </p>
                  <p>
                    We do not share your personal data with any other third parties for their own marketing purposes.
                  </p>
                  <p>
                    Some of our service providers (such as SendinBlue or Supabase) may store or process data outside your country of residence. We ensure that appropriate safeguards are in place to protect your information, such as standard contractual clauses approved by the European Commission.
                  </p>
                </div>
              </section>

              {/* Use Of Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Use Of Data
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>Universal Affiliates Ltd uses the collected data for various purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical issues or fraudulent activity</li>
                    <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
                  </ul>
                </div>
              </section>

              {/* Opting Out */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Opting Out
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link in emails or by managing your communication preferences in your account settings.
                </p>
              </section>

              {/* Retention Of Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Retention Of Data
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Universal Affiliates Ltd will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                  </p>
                  <p>
                    Universal Affiliates Ltd will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
                  </p>
                </div>
              </section>

              {/* Transfer Of Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Transfer Of Data
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                  </p>
                  <p>
                    If you are located outside United Kingdom and choose to provide information to us, please note that we transfer the data, including Personal Data, to United Kingdom and process it there.
                  </p>
                  <p>
                    Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                  </p>
                  <p>
                    Universal Affiliates Ltd will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                  </p>
                </div>
              </section>

              {/* Disclosure Of Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Disclosure Of Data
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Disclosure For Law Enforcement</h3>
                    <p>Under certain circumstances, Universal Affiliates Ltd may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Legal Requirements</h3>
                    <p>Universal Affiliates Ltd may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>To comply with a legal obligation</li>
                      <li>To protect and defend the rights or property of Universal Affiliates Ltd</li>
                      <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                      <li>To protect the personal safety of users of the Service or the public</li>
                      <li>To protect against legal liability</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Security Of Data */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Security Of Data
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The security of your data is very important to us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Your Rights
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Universal Affiliates Ltd aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
                  </p>
                  <p>
                    Whenever made possible, you can update your Personal Data directly within your account settings section. If you are unable to change your Personal Data, please contact us to make the required changes.
                  </p>
                  <p>
                    In certain circumstances, you have rights under data protection laws in relation to your personal data.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Request access to your personal data</strong> (commonly known as a &quot;data subject access request&quot;). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.</li>
                    <li><strong>Request correction of the personal data that we hold about you.</strong> This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.</li>
                    <li><strong>Request erasure of your personal data.</strong> This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it.</li>
                    <li><strong>Request the transfer of your personal data to you or to a third party.</strong> We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use.</li>
                    <li><strong>Withdraw consent at any time</strong> where we are relying on consent to process your personal data. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.</li>
                  </ul>
                  <p>
                    To exercise your rights as detailed above, please contact us at ADMIN@UNIVERSAL-POKER.COM
                  </p>
                </div>
              </section>

              {/* What We May Need From You */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  What We May Need From You
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data. This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it.
                </p>
              </section>

              {/* Service Providers */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Service Providers
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    We may employ third party companies and individuals to facilitate our Service (&quot;Service Providers&quot;), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                  </p>
                  <p>
                    These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                  </p>
                </div>
              </section>

              {/* Google Analytics */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Google Analytics
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    We may use third-party Service Providers to monitor and analyze the use of our Service.
                  </p>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Google Analytics</h3>
                    <p>
                      Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                    </p>
                    <p>
                      You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
                    </p>
                    <p>
                      For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="http://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#077124] hover:text-[#0a9b30] underline">http://www.google.com/intl/en/policies/privacy/</a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Links To Other Services */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Links To Other Services
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Our Service may contain links to other Services that are not operated by us. If you click on a third party link, you will be directed to that third party&apos;s Service. We strongly advise you to review the Privacy Policy of every Service you visit.
                  </p>
                  <p>
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party Services or services.
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Children&apos;s Privacy
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Our service does not address anyone under the age of 18 (&quot;Children&quot;).
                  </p>
                  <p>
                    We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your children have provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                  </p>
                </div>
              </section>

              {/* Changes To This Privacy Policy */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Changes To This Privacy Policy
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    We may update our Privacy Policy from time to time so please check back regularly. We will notify you of any changes by posting the new Privacy Policy on this page.
                  </p>
                  <p>
                    We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the &quot;effective date&quot; at the top of this Privacy Policy.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </section>

              {/* Contact Us */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Contact Us
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <p><strong>Email:</strong> Support@universalpoker.com</p>
                </div>
              </section>

              {/* Who Are We */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Who Are We
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Our website address is: <a href="https://www.universalpoker.com" target="_blank" rel="noopener noreferrer" className="text-[#077124] hover:text-[#0a9b30] underline">https://www.universalpoker.com</a> part of the Universal Affiliates Ltd.
                </p>
              </section>

            </div>
          </div>

          {/* Important Notice */}
          <div className="relative rounded-2xl overflow-hidden mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5"></div>
            <div className="relative border border-amber-500/20 rounded-2xl p-6 bg-black/40 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-500" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">Important Notice</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    By using UniversalPoker.com, you agree to this privacy policy. Please read it carefully. It is your responsibility to check back regularly for any changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

