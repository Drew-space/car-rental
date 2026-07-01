export default function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <p className="text-lg font-bold">⌘ Horizone</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Our mission is to equip modern explorers with cutting-edge,
            functional, and stylish rides that elevate every adventure.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3 text-sm">About</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#about" className="hover:text-foreground">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Career
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3 text-sm">Support</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#contact" className="hover:text-foreground">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Return
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        {/* <div>
          <p className="font-semibold mb-3 text-sm">Get Updates</p>
          <div className="flex items-center rounded-full border border-border bg-surface overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button className="bg-foreground text-background px-4 py-2 text-xs font-medium rounded-full m-1">
              Subscribe
            </button>
          </div>
        </div> */}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>©2026 Horizone. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
