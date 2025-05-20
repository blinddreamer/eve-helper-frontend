import React from "react";
import Animated from "./Animated";

function CookiePolicy() {
  return (
    <Animated>
      <div id="container-cookie">
        <div id="homebox" className="container">
          <main
            style={{ lineHeight: "1.6", padding: "20px" }}
            className="text-left" // Make sure text is aligned to the left
          >
            <h1 className="mb-4">Cookie Policy</h1>
            <p className="mb-4">Effective Date: 23/03/2025</p>

            <section className="mb-4">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small files placed on your device that allow
                websites to store information about your preferences or actions.
                These cookies help improve your experience by remembering things
                like login details, language preferences, and browsing history.
              </p>
            </section>

            <section className="mb-4">
              <h2>Different Types of Cookies</h2>
              <ul>
                <li>
                  <strong>Necessary Cookies:</strong> Essential for the basic
                  functioning of the website and cannot be disabled in our
                  systems.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how
                  visitors interact with our website by collecting and reporting
                  information anonymously.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Enable the website to
                  provide enhanced functionality and personalization.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> Used to deliver targeted
                  ads or content based on your interests.
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2>Why We Use Cookies</h2>
              <ul>
                <li>To ensure our website functions properly and securely.</li>
                <li>
                  To improve your experience by remembering preferences and
                  settings.
                </li>
                <li>To analyze website performance and user behavior.</li>
                <li>
                  To personalize content and deliver targeted ads based on your
                  interests.
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2>How You Can Control Cookies</h2>
              <p>
                You have control over how cookies are used on our website. You
                can manage your cookie preferences by:
              </p>
              <ul>
                <li>
                  <strong>Browser Settings:</strong> Most web browsers
                  automatically accept cookies, but you can modify your browser
                  settings to block cookies or alert you when cookies are being
                  sent. Some features may not work properly if you disable
                  cookies.
                </li>
                <li>
                  <strong>Cookie Consent:</strong> You will be asked to accept
                  or decline our use of cookies when visiting our website.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt-out of targeted
                  advertising cookies by visiting industry opt-out platforms
                  such as the{" "}
                  <a
                    href="http://www.networkadvertising.org/choices"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Network Advertising Initiative
                  </a>{" "}
                  or the{" "}
                  <a
                    href="http://www.aboutads.info/choices"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2>Third-Party Cookies</h2>
              <p>
                We may allow third-party services to set cookies on your device.
                These third-party cookies are governed by the privacy policies
                of the third-party providers. We do not have access to or
                control over these cookies.
              </p>
            </section>

            <section className="mb-4">
              <h2>Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. If we make
                any changes, we will post the updated policy on this page and
                update the "Effective Date" at the top of the policy. We
                encourage you to review this Cookie Policy periodically for any
                updates.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about our Cookie Policy,
                please contact us at:
              </p>
              <p>
                <strong>EVE Helper</strong>
                <br />
                Email:{" "}
                <a href="mailto:contact@eve-helper.com">
                  support@eve-helper.com
                </a>
              </p>
            </section>
          </main>
        </div>
      </div>
    </Animated>
  );
}

export default CookiePolicy;
