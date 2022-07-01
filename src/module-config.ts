/**
 * parametri del modulo
 */
export interface ModuleConfig {
    loginURL?: string; // URL di login completo
    /**
     * URL di login relativo (solo la parte finale).
     * Se passato, l'URL sarà concatenatocalcolato prendendo la parte iniziale dell'indirizzo dell'applicazione
     */
    relativeURL?: string;
}
