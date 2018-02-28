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
    /**
     * imposta il nome di rotta del componente di login
     */
    loginComponentRoute: string;
    /**
     * imposta il nome di rotta del componente di home; se l'utente richiede la pagina di login ma è già loggato deve
     * essere reindirizzato al componente di login
     */
    homeComponentRoute: string;
}
