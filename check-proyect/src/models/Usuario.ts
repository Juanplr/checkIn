class Usuario {
    id: number;
    nombre: string;
    user_name: string;
    es_administrador: boolean;

    constructor();

    constructor(
        id: number,
        nombre: string,
        user_name: string,
        es_administrador: boolean
    );

    constructor(
        id?: number,
        nombre?: string,
        user_name?: string,
        es_administrador?: boolean
    ) {

        this.id = id ?? 0;
        this.nombre = nombre ?? "";
        this.user_name = user_name ?? "";
        this.es_administrador = es_administrador ?? false;
    }

}

export default Usuario;