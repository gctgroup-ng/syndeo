"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Con from "@/components/images/syndeocontact.svg"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const PHONE_PLACEHOLDERS: Record<string, string> = {
  US: "(555) 000-0000",
  NG: "0800 000 0000",
  UK: "020 0000 0000",
  CA: "(555) 000-0000",
}

const COUNTRY_CODES: Record<string, string> = {
  US: "+1",
  NG: "+234",
  UK: "+44",
  CA: "+1",
}

export default function ContactPage() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("US")
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null) 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitError('')
    setSubmitSuccess(false)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            email: formData.get('email'),
            phone: `${COUNTRY_CODES[selectedCountry]} ${
              String(formData.get('phone') || '')
            }`.trim(),
            message: formData.get('message'),
          }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitSuccess(true)
      formRef.current?.reset()
      setSelectedCountry("US")
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message. Please try again.'
      setSubmitError(message)    
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 md:py-24 mx-auto">
        <div className="container px-4 md:px-14">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl mt-9 md:text-4xl font-bold text-[#2A007A]">Get in touch</h2>
              <p className="text-muted-foreground">Our friendly team would love to hear from you.</p>

              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                    <input
                      id="first-name"
                      name="first-name"
                      placeholder="First name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                    <input
                      id="last-name"
                      name="last-name"
                      placeholder="Last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
                  <div className="flex">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-l-md w-[100px] bg-gray-50"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      name="country"
                    >
                      {Object.entries(COUNTRY_CODES).map(([code, dial]) => (
                        <option key={code} value={code}>
                          {code} {dial}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={PHONE_PLACEHOLDERS[selectedCountry]}
                      className="flex-1 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="privacy" className="text-sm">
                    You agree to our friendly{" "}
                    <button
                      type="button"
                      className="text-[#6642EC] underline"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                      privacy policy
                    </button>
                  </label>
                </div>

                {submitSuccess && (
                  <p className="text-green-600 text-sm text-center bg-green-50 py-2 rounded-md">
                    ✓ Message sent! We'll get back to you soon.
                  </p>
                )}
                {submitError && (
                  <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-md">
                    ✗ {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#6642EC] hover:bg-[#6642EC]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            </div>

            <div className="relative h-[700px] rounded-xl overflow-hidden">
              <Image src={Con} alt="Abstract geometric pattern" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#2A007A]">Privacy Policy</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4 text-sm">
            <h3 className="font-semibold text-base">1. Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
            </p>
            
            <h3 className="font-semibold text-base">2. Information We Collect</h3>
            <p>
              Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            
            <h3 className="font-semibold text-base">3. How We Use Your Information</h3>
            <p>
              Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas faucibus mollis interdum. Donec sed odio dui.
            </p>
            
            <h3 className="font-semibold text-base">4. Sharing Your Information</h3>
            <p>
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            
            <h3 className="font-semibold text-base">5. Your Rights</h3>
            <p>
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.
            </p>
            
            <h3 className="font-semibold text-base">6. Security</h3>
            <p>
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            
            <h3 className="font-semibold text-base">7. Changes to This Policy</h3>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
            </p>
            
            <h3 className="font-semibold text-base">8. Contact Us</h3>
            <p>
              Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </main>
  )
}