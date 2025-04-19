
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfServicePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="content-container py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="mb-6">Last Updated: April 3, 2025</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using FinSage's services, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing 
                our services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Services</h2>
              <p className="mb-4">
                FinSage provides financial literacy and portfolio management services through our platform. You agree to use 
                our services only for lawful purposes and in accordance with these Terms.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Account Registration</h3>
              <p className="mb-4">
                To access certain features of our platform, you may be required to register for an account. You agree to provide 
                accurate, current, and complete information during the registration process and to update such information to 
                keep it accurate, current, and complete.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Account Security</h3>
              <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that 
                occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content and Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality available through our platform, including but not limited to text, 
                graphics, logos, icons, images, audio clips, and software, are owned by FinSage, its licensors, or other 
                providers of such material and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer of Warranties</h2>
              <p className="mb-4">
                Our services are provided on an "as is" and "as available" basis, without warranties of any kind, either 
                express or implied. We do not warrant that our services will be uninterrupted, error-free, or secure.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall FinSage, its directors, employees, partners, agents, suppliers, or affiliates be liable for 
                any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability 
                to access or use our services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Indemnification</h2>
              <p className="mb-4">
                You agree to defend, indemnify, and hold harmless FinSage, its directors, employees, partners, agents, suppliers, 
                or affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or 
                fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your 
                use of our services.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction where 
                FinSage is incorporated, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by 
                posting the new Terms on our platform and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mb-4">
                Email: <a href="mailto:legal@finsage.com" className="text-primary-600 hover:underline">legal@finsage.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
