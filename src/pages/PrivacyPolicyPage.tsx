
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="content-container py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="mb-6">Last Updated: April 3, 2025</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                At FinSage, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                platform. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  <strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide.
                </li>
                <li className="mb-2">
                  <strong>Financial Information:</strong> Information about your financial goals, investments, portfolio details, 
                  and other financial data you choose to share.
                </li>
                <li className="mb-2">
                  <strong>Usage Information:</strong> How you interact with our platform, including features you use, content you view, 
                  and your preferences.
                </li>
                <li className="mb-2">
                  <strong>Device Information:</strong> Information about your device, browser, IP address, and other technical data.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">To provide and maintain our services</li>
                <li className="mb-2">To personalize your experience on our platform</li>
                <li className="mb-2">To analyze and improve our services</li>
                <li className="mb-2">To communicate with you about our services</li>
                <li className="mb-2">To comply with legal obligations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
              <p className="mb-4">
                We may share your information with third parties only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">With service providers who help us operate our platform</li>
                <li className="mb-2">With your consent or at your direction</li>
                <li className="mb-2">To comply with legal obligations</li>
                <li className="mb-2">In connection with a business transfer or transaction</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">The right to access your personal information</li>
                <li className="mb-2">The right to rectify inaccurate information</li>
                <li className="mb-2">The right to erasure of your information</li>
                <li className="mb-2">The right to restrict processing</li>
                <li className="mb-2">The right to data portability</li>
                <li className="mb-2">The right to object to processing</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                Email: <a href="mailto:support@finsage.com" className="text-primary-600 hover:underline">support@finsage.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
