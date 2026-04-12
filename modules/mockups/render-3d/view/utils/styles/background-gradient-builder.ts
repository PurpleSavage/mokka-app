export const OrientationGradient = {
    // Lineales
    TO_RIGHT:        'to right',
    TO_LEFT:         'to left',
    TO_BOTTOM:       'to bottom',
    TO_TOP:          'to top',
    TO_BOTTOM_RIGHT: 'to bottom right',
    TO_BOTTOM_LEFT:  'to bottom left',
    TO_TOP_RIGHT:    'to top right',
    TO_TOP_LEFT:     'to top left',

    // Radiales
    RADIAL_CIRCLE:          'radial-circle',
    RADIAL_ELLIPSE:         'radial-ellipse',
    RADIAL_CIRCLE_CENTER:   'radial-circle-center',
    RADIAL_CIRCLE_TOP:      'radial-circle-top',
    RADIAL_CIRCLE_BOTTOM:   'radial-circle-bottom',
    RADIAL_CLOSEST_SIDE:    'radial-closest-side',
    RADIAL_FARTHEST_SIDE:   'radial-farthest-side',
    RADIAL_CLOSEST_CORNER:  'radial-closest-corner',
    RADIAL_FARTHEST_CORNER: 'radial-farthest-corner',

    // Cónicos
    CONIC:             'conic',
    CONIC_FROM_TOP:    'conic-from-top',
    CONIC_FROM_LEFT:   'conic-from-left',
    CONIC_FROM_BOTTOM: 'conic-from-bottom',
    CONIC_FROM_RIGHT:  'conic-from-right',
} as const

export type OrientationGradientType = typeof OrientationGradient[keyof typeof OrientationGradient]

type GradientBuilder = (stops: string) => string

const gradientBuilders: Record<OrientationGradientType, GradientBuilder> = {
    // Lineales
    [OrientationGradient.TO_RIGHT]:        (stops) => `linear-gradient(to right, ${stops})`,
    [OrientationGradient.TO_LEFT]:         (stops) => `linear-gradient(to left, ${stops})`,
    [OrientationGradient.TO_BOTTOM]:       (stops) => `linear-gradient(to bottom, ${stops})`,
    [OrientationGradient.TO_TOP]:          (stops) => `linear-gradient(to top, ${stops})`,
    [OrientationGradient.TO_BOTTOM_RIGHT]: (stops) => `linear-gradient(to bottom right, ${stops})`,
    [OrientationGradient.TO_BOTTOM_LEFT]:  (stops) => `linear-gradient(to bottom left, ${stops})`,
    [OrientationGradient.TO_TOP_RIGHT]:    (stops) => `linear-gradient(to top right, ${stops})`,
    [OrientationGradient.TO_TOP_LEFT]:     (stops) => `linear-gradient(to top left, ${stops})`,

    // Radiales
    [OrientationGradient.RADIAL_CIRCLE]:          (stops) => `radial-gradient(circle, ${stops})`,
    [OrientationGradient.RADIAL_ELLIPSE]:         (stops) => `radial-gradient(ellipse, ${stops})`,
    [OrientationGradient.RADIAL_CIRCLE_CENTER]:   (stops) => `radial-gradient(circle at center, ${stops})`,
    [OrientationGradient.RADIAL_CIRCLE_TOP]:      (stops) => `radial-gradient(circle at top, ${stops})`,
    [OrientationGradient.RADIAL_CIRCLE_BOTTOM]:   (stops) => `radial-gradient(circle at bottom, ${stops})`,
    [OrientationGradient.RADIAL_CLOSEST_SIDE]:    (stops) => `radial-gradient(circle closest-side, ${stops})`,
    [OrientationGradient.RADIAL_FARTHEST_SIDE]:   (stops) => `radial-gradient(circle farthest-side, ${stops})`,
    [OrientationGradient.RADIAL_CLOSEST_CORNER]:  (stops) => `radial-gradient(circle closest-corner, ${stops})`,
    [OrientationGradient.RADIAL_FARTHEST_CORNER]: (stops) => `radial-gradient(circle farthest-corner, ${stops})`,

    // Cónicos
    [OrientationGradient.CONIC]:             (stops) => `conic-gradient(${stops})`,
    [OrientationGradient.CONIC_FROM_TOP]:    (stops) => `conic-gradient(from 0deg at top, ${stops})`,
    [OrientationGradient.CONIC_FROM_LEFT]:   (stops) => `conic-gradient(from 270deg at left, ${stops})`,
    [OrientationGradient.CONIC_FROM_BOTTOM]: (stops) => `conic-gradient(from 180deg at bottom, ${stops})`,
    [OrientationGradient.CONIC_FROM_RIGHT]:  (stops) => `conic-gradient(from 90deg at right, ${stops})`,
}

export function backgroundGradientBuilder(values: string[], type: OrientationGradientType): string {
    return gradientBuilders[type](values.join(", "))
}