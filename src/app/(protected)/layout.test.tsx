import { describe, it, expect, vi } from 'vitest'
import React from 'react'

vi.mock('./account/actions', () => ({
  logout: vi.fn(),
}))

import ProtectedLayout from './layout'

describe('ProtectedLayout', () => {
  it('renders children within the layout', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Test Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('Test Content')
  })

  it('renders a Dashboard navigation link', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('/dashboard')
    expect(rendered).toContain('Dashboard')
  })

  it('renders an Account navigation link', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('/account')
    expect(rendered).toContain('Account')
  })

  it('renders a Logout button', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('Logout')
  })

  it('uses flex flex-col min-h-screen for outer container', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('flex flex-col min-h-screen')
  })

  it('uses correct nav bar classes', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('bg-card border-b px-6 py-3 flex items-center justify-between')
  })

  it('uses max-w-4xl mx-auto px-4 py-8 for content area', () => {
    const result = ProtectedLayout({
      children: React.createElement('div', null, 'Content'),
    })

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('max-w-4xl mx-auto px-4 py-8')
  })
})
