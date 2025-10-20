"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <Header />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-32 pb-24 flex-1">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#077124]/20 to-emerald-500/10 border border-[#077124]/20 mb-6">
              <FileText className="h-8 w-8 text-[#077124]" strokeWidth={2} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ 
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.01em'
                }}>
              Terms & Conditions
            </h1>
          </div>

          {/* Terms Content */}
          <div className="relative group animate-fade-up-delay-400">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem]"></div>
            <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50"></div>
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-10 space-y-8">
              
              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (1) Agreement Between User and Universal Affiliates Ltd
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The Universal Affiliated Ltd website (known as UniversalPoker.com) is offered to you conditioned on your acceptance without modification of the terms, conditions and notices contained herein. Your use of the Universal Affiliates Ltd website constitutes your agreement to all such terms, conditions and notices.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (2) Modification of These Terms of Use
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Universal Affiliates Ltd reserves the right to change the terms, conditions and notices under which the Universal Affiliates Ltd website is offered at any time without notice. These updates will take effect as soon as they are posted here. It is your responsibility to check back regularly for any changes. Please note that the rates of rakeback for which you qualify are determined by the Poker Rooms with whom we work. If for any reason the Poker Room decides to reduce this rate at a later date for any reason, it is not a decision that we can affect. Providing we are informed of such change as well, we will endeavour to give you notice as soon as we can. It is your responsibility when signing up to a poker room to make sure that you adhere to the terms and conditions of that room, and are not contravening any rules/laws that the poker room or the territory/state/country (in which you are resident) have governing an account such as age or legality to wager on line. If for whatever reason a poker room offering rakeback defaults on its agreement to pay rakeback to you, Universal Affiliates Ltd shall not be liable for any outstanding rakeback monies (including any outstanding monies or prizes for previous or current promotions, including but not limited to rake races, chases and cash/prize freerolls) owed to any player by that room.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (3) Chargebacks and Payments
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  All Poker rooms have the right to withhold rakeback payments in the event they believe that there is reason to believe that a player is using their poker account for fraudulent purposes. In this event they can refuse to release commission to Universal Affiliates Ltd. Whilst these occurrences are few and far between, they are nonetheless possible and such player may be required by the room to pay such amounts withheld. Universal Affiliates Ltd depends on reports from the poker rooms to display the amount of rake generated and rakeback earned by players. The gross/rake numbers we receive from the poker rooms at the month end are subject to change at any time on account of extra/missing data, fraud and chargebacks. Poker software systems such as Poker Tracker and Poker Office do NOT provide accurate data. See FAQs for more information on this. The month end reports that we get from the poker rooms are final and Universal Affiliates Ltd are unable to enter into any discussion with any poker room on this issue as this would breach the poker room&apos;s player confidentiality rules. If you feel that the amount of rake you have generated in any given month is wrong, you will need to consult directly with the poker room before talking to Universal Affiliates Ltd In order for a player to receive payments, Universal Affiliates Ltd need to access online reports from the Poker Rooms they are affiliated with. These reports in the various forms show some, or a combination, of the following information: Player Name, player email, Player ID Number, Number of raked hands played, Rake generated in a given month, Overall Rake generated. By signing up through Universal Affiliates Ltd with any poker room for rakeback or VIP program, you are granting us permission to view these reports and are also granting permission for the respective poker room to allow us access to see said reports and the information contained therein.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (4) Specific Poker Room Information
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    All rakeback payments are calculated upon net rake. On occasion this is done once player retention bonuses, any other site give-aways and transaction charges have been deducted by the Poker Rooms. Some rooms do not deduct bonuses. At some rooms negative net rakes at the end of a month are carried forward by Universal Affiliates Ltd to the next month regardless of whether the associated poker room resets negative balances for Universal Affiliates Ltd to zero. This is because Universal Affiliates Ltd net rake for a poker room is calculated as a total of all players belonging to that room. Therefore, a net negative rake player will offset a player with a positive rake and whilst the positive rake player qualifies for rakeback, Universal Affiliates Ltd is not allocated a corresponding commission from the poker room because of the other player&apos;s negative contribution. Therefore, negative rake must be carried forward to make up for the losses incurred by Universal Affiliates Ltd. Players registered to more than one account through Universal Affiliates Ltd will have their net rakes combined and if possible, negative balances will be offset against positive ones and any referral fees or rake race/chase winnings. If a player signs up for poker rakeback and also chooses to play at that Poker room&apos;s casino (if it has one) they will not be entitled to cashback on any losses, they occur at the casino. A player who signs up through a Universal Affiliates Ltd poker link will only be entitled to rakeback on poker providing the room they have chosen caters for it. Some poker rooms offset a player&apos;s casino play against their rake generation. If this is the case casino winnings are offset against poker rake generated and so a player may find that they receive reduced or no rakeback at all in a given month Universal Affiliates Ltd shall not be liable for any change of rakeback program or loyalty scheme by a poker room which results in any loss of income for any player regardless of whether or not the player was adequately informed of said change by either the room or Universal Affiliates. It is always the player&apos;s responsibility to check the precise terms of the loyalty/rakeback program with the poker room should they suspect any change in said program.
                  </p>
                  <p>
                    <strong>All Rooms</strong> – By signing up through Universal Affiliates Ltd you accept that your rake and other data such as points/hands played will be provided to us by the poker room/casinos with whom we are affiliated. You also accept that we will on occasion, for the purpose of races, freerolls and other leader boards display this data publicly. As per GDPR guidelines we will never display or disclose to a third party any other personal data specific to you of your account.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (5) Referral and Affiliate Marketing
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    You may use Marketing Materials for the sole purpose of marketing to and referring potential players through Universal Affiliates Ltd to Poker Rooms. You will only use marketing materials that have been provided by us and/or pre-approved by us (collectively the &quot;Marketing Materials&quot;). You will not modify Universal Affiliates Ltd marketing materials without our prior written consent.
                  </p>
                  <p>
                    All marketing activities must be professional, proper and lawful under applicable rules or laws. You represent and warrant that you will not place banners or text links to Universal Affiliates Ltd on any website, or use any media or medium, that is libellous, discriminatory, obscene, unlawful or otherwise unsuitable or which contains sexually explicit, pornographic, obscene or graphically violent materials.
                  </p>
                  <p>
                    You will not actively target your marketing to any persons who are less than 18 years of age (or such higher age as may apply in the jurisdiction that you are targeting), regardless of the age of majority in the location you are marketing.
                  </p>
                  <p>
                    You will not use Spam, Adware or Spyware in your marketing attempts. This includes but it is not limited to, talking about rakeback in the chat at online tables
                  </p>
                  <p>
                    Under no circumstance are you allowed to use the Marketing Materials or any other promotional materials provided by us in a manner that may potentially confuse a potential player or third party.
                  </p>
                  <p>
                    Violation of any provision set out above will cause you to forfeit all outstanding monies, including any rakeback earned, referral fees and any outstanding prizes. This may extend across all poker rooms and networks covered by Universal Affiliates Ltd.
                  </p>
                  <p>
                    monies, we reserve the right to reverse the referral credits on the referrer&apos;s account (for the relevant months) until such time that the funds are received from the poker room (at which point they shall be re-credited). Universal Affiliates Ltd shall not be liable for any referral monies owed to any referrer for any referral activity if no commission for that same referred activity is ever received by Universal Affiliates Ltd from the room(s) in question.
                  </p>
                  <p>
                    For APL UK Accounting purposes, all referral monies that are outstanding (i.e. no payment method was selected by the referrer, or the minimum payment threshold was not met) for more than 12 months will be forfeited.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (6) Links to Third Party Sites
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The Universal Affiliates Ltd website may contain links to other websites (&quot;Linked Sites&quot;). The Linked Sites are not under the control of Universal Affiliates Ltd and Universal Affiliates Ltd is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Universal Affiliates is not responsible for webcasting or any other form of transmission received from any Linked Site Universal Affiliates is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Universal Affiliates of the site or any association with its operators.
                </p>
              </section>

              {/* Section 7 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (7) No Unlawful or Prohibited Use
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  As a condition of your use of the Universal Affiliates Ltd website, you warrant to Universal Affiliates Ltd that you will not use the Universal Affiliates Ltd website for any purpose that is unlawful or prohibited by these terms, conditions, and notices. You may not use the Universal Affiliates Ltd website in any manner which could damage, disable, overburden, or impair the Universal Affiliates Ltd website or interfere with any other party&apos;s use and enjoyment of the Universal Affiliates website Ltd. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Universal Affiliates Ltd website.
                </p>
              </section>

              {/* Section 8 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (8) Liability Disclaimer
                </h2>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                  <p className="uppercase">
                    The information, software, products, and services included in or available through the universal affiliates ltd website may include inaccuracies or typographical errors. Changes are periodically added to the information herein. Universal affiliates ltd and/or its suppliers may make improvements and/or changes in the universal affiliates ltd website at anytime. Advice received via the universal affiliates ltd website should not be relied upon for personal, medical, legal or financial decisions and you should consult an appropriate professional for specific advice tailored to your situation. It is your duty to check back regularly for any changes in the terms and conditions. This version modifies, replaces and supersedes all prior versions of this agreement.
                  </p>
                  <p className="uppercase">
                    Universal affiliates ltd and/or its suppliers make no representations about the suitability, reliability, availability, timeliness, and accuracy of the information, software, products, services and related graphics contained on the universal affiliates ltd website for any purpose. To the maximum extent permitted by applicable law, all such information, software, products, services and related graphics are provided &quot;as is&quot; without warranty or condition of any kind. Universal affiliates ltd and/or its suppliers hereby disclaim all warranties and conditions with regard to this information, software, products, services and related graphics, including all implied warranties or conditions of merchantability, fitness for a particular purpose, title and non-infringement.
                  </p>
                  <p className="uppercase">
                    To the maximum extent permitted by applicable law, in no event shall universal affiliates ltd and/or its suppliers be liable for any direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever including, without limitation, damages for loss of use, data or profits, arising out of or in any way connected with the use or performance of the universal affiliates ltd website, with the delay or inability to use the universal affiliates ltd website or related services, the provision of or failure to provide services, or for any information, software, products, services and related graphics obtained through the universal affiliates ltd website, or otherwise arising out of the use of the universal affiliates website, whether based on contract, tort, negligence, strict liability or otherwise, even if universal affiliates ltd or any of its suppliers has been advised of the possibility of damages. Because some states/jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, the above limitation may not apply to you. If you are dissatisfied with any portion of the universal affiliates ltd website, or with any of these terms of use, your sole and exclusive remedy is to discontinue using the universal affiliates ltd website.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (9) Copyright and Trademark Notices
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  All contents of the UniversalPoker.com website are: Copyright 2018 Universal Affiliates. com and/or its suppliers. All rights reserved.
                </p>
              </section>

              {/* Section 10 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (10) Trademarks
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The names of actual companies and products mentioned herein may be the trademarks of their respective owners. The example companies, organizations, products, people and events depicted herein are fictitious. No association with any real company, organization, product, person, or event is intended or should be inferred. Any rights not expressly granted herein are reserved.
                </p>
              </section>

              {/* Section 11 */}
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-white"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  (11) Governing Law
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  This Agreement shall be governed by the laws of England and Wales as are in force from time to time including, without limitation, the Electronic Communications Act, 2000 (C.7). By accepting this Agreement, you agree to submit to the exclusive jurisdiction of the location that we determine in our sole discretion in respect of any disputes arising out of, or connected with, this Agreement. Nothing in this paragraph shall prevent us from applying to the courts of any jurisdiction for such provisional or protective measures as are available under the laws of that jurisdiction.
                </p>
              </section>

            </div>
          </div>

          {/* Important Notice */}
          <div className="relative rounded-2xl overflow-hidden mt-8 animate-fade-up-delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5"></div>
            <div className="relative border border-amber-500/20 rounded-2xl p-6 bg-black/40 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-500" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">Important Notice</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    By using UniversalPoker.com, you agree to these terms and conditions. Please read them carefully. It is your responsibility to check back regularly for any changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out;
        }
        
        .animate-fade-up-delay-200 {
          animation: fade-up 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-up-delay-400 {
          animation: fade-up 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
}

