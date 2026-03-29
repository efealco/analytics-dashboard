import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDashboardStore } from './useDashboardStore'

describe('useDashboardStore', () => {
    beforeEach(() => {
        useDashboardStore.setState({
            preset: 'all',
            dateRange: { from: null, to: null },
        })
    })

    it('starts with preset "all" and null date range', () => {
        const { result } = renderHook(() => useDashboardStore())
        expect(result.current.preset).toBe('all')
        expect(result.current.dateRange.from).toBeNull()
        expect(result.current.dateRange.to).toBeNull()
    })

    it('setPreset updates preset and computes dateRange', () => {
        const { result } = renderHook(() => useDashboardStore())
        act(() => result.current.setPreset('30d'))
        expect(result.current.preset).toBe('30d')
        expect(result.current.dateRange.from).not.toBeNull()
        expect(result.current.dateRange.to).not.toBeNull()
    })

    it('setPreset("all") resets date range to null', () => {
        const { result } = renderHook(() => useDashboardStore())
        act(() => result.current.setPreset('7d'))
        act(() => result.current.setPreset('all'))
        expect(result.current.dateRange.from).toBeNull()
    })


    it('30d range "from" is approximately 30 days ago', () => {
        const { result } = renderHook(() => useDashboardStore())
        act(() => result.current.setPreset('30d'))
        const from = new Date(result.current.dateRange.from!)
        const diff = (Date.now() - from.getTime()) / (1000 * 60 * 60 * 24)
        expect(diff).toBeGreaterThanOrEqual(30)
        expect(diff).toBeLessThan(31)
    })
})