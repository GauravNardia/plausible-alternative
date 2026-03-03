export const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 text-sm text-gray-600">
        <div>
          <div className="font-semibold text-black mb-4">
            🐧 Puffin Analytics
          </div>
          <p>Privacy-first analytics for modern builders.</p>
        </div>

        <div>
          <p className="font-semibold text-black mb-4">Product</p>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Pricing</li>
            <li>Docs</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-black mb-4">Company</p>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-black mb-4">Legal</p>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 pb-6">
        © 2026 Puffin Analytics
      </div>
    </footer>
  )
}