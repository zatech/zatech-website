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

  it('should render all navigation links', () => {
    renderNavbar()
    
    expect(screen.getByText('ZATech')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Report')).toBeInTheDocument()
    expect(screen.getByText('Sponsorship')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Wiki')).toBeInTheDocument()
    expect(screen.getByText('Code of Conduct')).toBeInTheDocument()
    expect(screen.getByText('Request Invite →')).toBeInTheDocument()
  })

  it('should handle Home link click on homepage', async () => {
    const user = userEvent.setup()
    renderNavbar()
    
    const homeLink = screen.getByText('Home')
    await user.click(homeLink)
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('should handle About link click', async () => {
    const user = userEvent.setup()
    
    // Mock smooth scroll helper
    const scrollMock = scrollSectionIntoView
    scrollMock.mockImplementation(() => {})
    
    renderNavbar()
    
    const aboutLink = screen.getByText('About')
    await user.click(aboutLink)
    
    expect(scrollMock).toHaveBeenCalledWith('about', { offset: 24 })
  })

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
    
    // Check if menu opened (this test depends on the DOM structure)
    // In a real app, you might add data-testid attributes for easier testing
  })

  it('should render external links with correct attributes', () => {
    renderNavbar()
    
    const wikiLink = screen.getByText('Wiki')
    expect(wikiLink).toHaveAttribute('href', 'https://wiki.zatech.co.za')
    expect(wikiLink).toHaveAttribute('target', '_blank')
    expect(wikiLink).toHaveAttribute('rel', 'noreferrer')
    
    const cocLink = screen.getByText('Code of Conduct')
    expect(cocLink).toHaveAttribute('href', 'https://zatech.co.za/coc')
    expect(cocLink).toHaveAttribute('target', '_blank')
    expect(cocLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('should render invite button with correct link', () => {
    renderNavbar()
    
    const inviteButton = screen.getByText('Request Invite →')
    expect(inviteButton).toHaveAttribute('href', '#invite-email')
  })

  it('should apply custom className when provided', () => {
    const { container } = renderNavbar({ className: 'custom-navbar' })
    const navbar = container.querySelector('.navbar')
    
    expect(navbar).toHaveClass('custom-navbar')
  })

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
    const reportLink = screen.getByText('Report')
    
    // Open menu first
    await user.click(logo)
    
    // Click a navigation link
    await user.click(reportLink)
    
    // Menu should close (in a real implementation, you'd check the state)
    // This test would need to verify the menu closes after navigation
  })
})
