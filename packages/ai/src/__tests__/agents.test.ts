import { describe, it, expect } from 'vitest'
import { AGENTS } from '../agents'

describe('AGENTS config', () => {
  it('should have 3 agents', () => {
    expect(Object.keys(AGENTS)).toHaveLength(3)
  })

  it('should have marc, sofia, lea', () => {
    expect(AGENTS.marc).toBeDefined()
    expect(AGENTS.sofia).toBeDefined()
    expect(AGENTS.lea).toBeDefined()
  })

  it('each agent should have required fields', () => {
    for (const agent of Object.values(AGENTS)) {
      expect(agent.name).toBeTruthy()
      expect(agent.role).toBeTruthy()
      expect(agent.tone).toBeTruthy()
      expect(agent.systemPrompt).toBeTruthy()
      expect(agent.systemPrompt.length).toBeGreaterThan(50)
    }
  })

  it('marc should be business advisor', () => {
    expect(AGENTS.marc.name).toBe('Marc')
    expect(AGENTS.marc.role).toContain('création')
  })

  it('sofia should be CRM expert', () => {
    expect(AGENTS.sofia.name).toBe('Sofia')
    expect(AGENTS.sofia.role).toContain('CRM')
  })

  it('lea should be web specialist', () => {
    expect(AGENTS.lea.name).toBe('Léa')
    expect(AGENTS.lea.role).toContain('Site Web')
  })

  it('agents should mention escalation in system prompts', () => {
    for (const agent of Object.values(AGENTS)) {
      expect(agent.systemPrompt).toContain('escalade')
    }
  })
})
