import reducer, { setCards, setCard } from '../cardSlice';
import { Card } from '../../types/card';
import { generateFakeCardData } from '../../../../__mocks__/card';

describe('cardSlice', () => {
  const cardA = generateFakeCardData({
    id: 'a',
    number: '4111111111111111',
    cvv: '123',
    name: 'User A'
  } as Card);
  const cardB = generateFakeCardData({
    id: 'b',
    number: '4222222222222222',
    cvv: '456',
    name: 'User B'
  } as Card);

  it('returns initial state for unknown action', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      cards: [],
      loading: false,
      error: null
    });
  });

  it('setCards replaces the entire cards array', () => {
    const prev = reducer(undefined, { type: 'NOOP' });
    const next = reducer(prev, setCards([cardA, cardB]));
    expect(next.cards).toEqual([cardA, cardB]);
    expect(next).not.toBe(prev);
  });

  it('setCard appends a card to existing array', () => {
    const base = reducer(undefined, setCards([cardA]));
    const next = reducer(base, setCard(cardB));
    expect(next.cards).toHaveLength(2);
    expect(next.cards[1]).toEqual(cardB);
    expect(next).not.toBe(base);
  });

  it('sequence: setCards then setCard maintains order', () => {
    let state = reducer(undefined, setCards([cardA]));
    state = reducer(state, setCard(cardB));
    expect(state.cards.map((c) => c.id)).toEqual(['a', 'b']);
  });

  it('setCard on empty state adds first item', () => {
    const state = reducer(undefined, setCard(cardA));
    expect(state.cards).toEqual([cardA]);
  });
});
