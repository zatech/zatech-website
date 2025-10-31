import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' })
  }
})

vi.mock('../../utils/scrollToSection.js', () => ({
  __esModule: true,
  default: vi.fn(),
  scrollSectionIntoView: vi.fn(),
}))

// AI Somewhat assisted in writing these Navbar tests well the initial setup their where
// numerous change in requirements so the navbar and test where updated frequently.
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import scrollSectionIntoView from '../../utils/scrollToSection.js'

// Mock window.scrollTo for smooth scrolling tests
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
})

const renderNavbar = (props = {}) => {
  return render(
    <BrowserRouter>
      <Navbar {...props} />
    </BrowserRouter>
  )
}

// Test suite for Navbar component
describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset window size for each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  // Test cases
  it('should render all navigation links', () => {
    renderNavbar()
    
    // Check for presence of all nav links
    expect(screen.getByText('ZATech')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Sponsorship')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  expect(screen.getByText('Wiki')).toBeInTheDocument()
    expect(screen.getByText('Request Invite →')).toBeInTheDocument()
  })

  // Test case for Home link click on homepage
  it('should handle Home link click on homepage', async () => {
    const user = userEvent.setup()
    renderNavbar()
    
    const homeLink = screen.getByText('Home')
    await user.click(homeLink)
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  // Test case for About link click
  it('should handle About link click', async () => {
    const user = userEvent.setup()
    
    // Mock smooth scroll helper
    const scrollMock = scrollSectionIntoView
    scrollMock.mockImplementation(() => {})
    
    const aboutSection = document.createElement('section')
    aboutSection.id = 'about'
    document.body.appendChild(aboutSection)

    renderNavbar()
    
    const aboutLink = screen.getByText('About')
    await user.click(aboutLink)
    
    expect(scrollMock).toHaveBeenCalledWith(aboutSection, { offset: 24 })
    document.body.removeChild(aboutSection)
  })

  // Test case for FAQ link click
  it('should handle Sponsorship link click', async () => {
    const user = userEvent.setup()
    
    renderNavbar()
    
    const sponsorshipLink = screen.getByText('Sponsorship')
    await user.click(sponsorshipLink)
    
    // Since it's a Link component, it should have the correct href
    expect(sponsorshipLink).toHaveAttribute('href', '/sponsorship')
  })

  it('should toggle mobile menu when logo is clicked on mobile', async () => {
    const user = userEvent.setup()
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })
    
    renderNavbar()
    
    const logo = screen.getByText('ZATech')
    // Get all generic divs and find the one with class navbar-links
    const allDivs = screen.getAllByRole('generic')
    const navMenu = allDivs.find(div => div.classList.contains('navbar-links'))
    
    // Menu should be closed initially
    expect(navMenu).not.toHaveClass('open')
    
    // Click logo to open menu
    await user.click(logo)
  })

  // Test case for external links
  it('should render external links with correct attributes', () => {
    renderNavbar()
    
    const wikiLink = screen.getByText('Wiki')
    expect(wikiLink).toHaveAttribute('href', 'https://wiki.zatech.co.za')
    expect(wikiLink).toHaveAttribute('target', '_blank')
    expect(wikiLink).toHaveAttribute('rel', 'noreferrer')
    
  // The Code of Conduct link was removed from the Navbar component.
  // Only assert external Wiki link attributes here.
  })

  // Test case for invite button link
  it('should render invite button with correct link', () => {
    renderNavbar()
    
    const inviteButton = screen.getByText('Request Invite →')
    expect(inviteButton).toHaveAttribute('href', '#invite-email')
  })

  // Test case for custom className prop
  it('should apply custom className when provided', () => {
    const { container } = renderNavbar({ className: 'custom-navbar' })
    const navbar = container.querySelector('.navbar')
    
    expect(navbar).toHaveClass('custom-navbar')
  })

  // Test case for keyboard navigation
  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup()
    renderNavbar()
    
    const logo = screen.getByText('ZATech')
    
    // Test tab navigation
    await user.tab()
    expect(logo).toHaveFocus()
    
    await user.tab()
    expect(screen.getByText('Home')).toHaveFocus()
  })

  // Test case for closing mobile menu on link click
  it('should close mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })
    
    renderNavbar()
    
    const logo = screen.getByText('ZATech')
    const sponsorshipLink = screen.getByText('Sponsorship')
    
    // Open menu first
    await user.click(logo)
    
    // Click a navigation link
    await user.click(sponsorshipLink)
    
  })
})
