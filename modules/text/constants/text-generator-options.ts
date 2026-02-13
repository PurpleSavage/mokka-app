import { FormatText, LengthText, PromotingText, ToneText } from "../domain/enums/options-text";

export interface OptionTextGenerator<T> {
    id: string;
    name: T; 
  }
export const promotingArray: OptionTextGenerator<PromotingText>[] = [
    { id: '1', name: PromotingText.PRODUCT },
    { id: '2', name: PromotingText.SERVICE },
    { id: '3', name: PromotingText.APP },
    { id: '4', name: PromotingText.COURSE },
    { id: '5', name: PromotingText.PERSONAL_BRAND },
    { id: '6', name: PromotingText.OTHER }
];

export const toneArray: OptionTextGenerator<ToneText>[] = [
    { id: '1', name: ToneText.PROFESSIONAL },
    { id: '2', name: ToneText.EMOTIONAL },
    { id: '3', name: ToneText.FUN },
    { id: '4', name: ToneText.CREATIVE },
    { id: '5', name: ToneText.INFORMAL }
];

export const lengthArray: OptionTextGenerator<LengthText>[]  = [
    { id: '1', name: LengthText.SHORT },
    { id: '2', name: LengthText.MEDIUM },
    { id: '3', name: LengthText.LARGE }
];

export const formatArray: OptionTextGenerator<FormatText>[]  = [
    { id: '1', name: FormatText.DESCRIPTION },
    { id: '2', name: FormatText.NETWORK_ANNOUNCEMENT },
    { id: '3', name: FormatText.IMPACT_PHRASE },
    { id: '4', name: FormatText.SLOGAN }
];

export const colorsLength = new Map<LengthText, { text: string; bg: string }>([
  [LengthText.SHORT, {
    text: 'text-sky-600',
    bg: 'bg-sky-100'
  }],
  [LengthText.MEDIUM, {
    text: 'text-cyan-600',
    bg: 'bg-cyan-100'
  }],
  [LengthText.LARGE, {
    text: 'text-violet-600',
    bg: 'bg-violet-100' // Corregido de text- a bg-
  }]
]);

export const colorsFormat = new Map<FormatText, { text: string; bg: string }>([
  [FormatText.DESCRIPTION, {
    text: 'text-pink-600',
    bg: 'bg-pink-100'
  }],
  [FormatText.NETWORK_ANNOUNCEMENT, {
    text: 'text-emerald-600',
    bg: 'bg-emerald-100'
  }],
  [FormatText.IMPACT_PHRASE, {
    text: 'text-amber-600',
    bg: 'bg-amber-100'
  }],
  [FormatText.SLOGAN, {
    text: 'text-violet-600',
    bg: 'bg-violet-100'
  }]
]);

export const colorsTone = new Map<ToneText, { text: string; bg: string }>([
  [ToneText.PROFESSIONAL, {
    text: 'text-blue-700',
    bg: 'bg-blue-100'
  }],
  [ToneText.EMOTIONAL, {
    text: 'text-rose-700',
    bg: 'bg-rose-100'
  }],
  [ToneText.FUN, {
    text: 'text-yellow-700',
    bg: 'bg-yellow-100'
  }],
  [ToneText.CREATIVE, {
    text: 'text-purple-700',
    bg: 'bg-purple-100'
  }],
  [ToneText.INFORMAL, {
    text: 'text-green-700',
    bg: 'bg-green-100'
  }]
]);

export const colorsPromoting = new Map<PromotingText, { text: string; bg: string }>([
  [PromotingText.PRODUCT, {
    text: 'text-indigo-700',
    bg: 'bg-indigo-100'
  }],
  [PromotingText.SERVICE, {
    text: 'text-teal-700',
    bg: 'bg-teal-100'
  }],
  [PromotingText.APP, {
    text: 'text-cyan-700',
    bg: 'bg-cyan-100'
  }],
  [PromotingText.COURSE, {
    text: 'text-orange-700',
    bg: 'bg-orange-100'
  }],
  [PromotingText.PERSONAL_BRAND, {
    text: 'text-pink-700',
    bg: 'bg-pink-100'
  }],
  [PromotingText.OTHER, {
    text: 'text-gray-700',
    bg: 'bg-gray-200'
  }]
])