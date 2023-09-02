export const getPostsMock = async (req: any, res: any) => {
    try{
        res.status(200).send(mockPosts)
    }catch(e){
        res.status(500).send({message: `Error in ${e}`})
    }
}

const mockPosts: any = {
    "message": "Retorno concluído com sucesso!",
    "data": [
        {
            "nomeUsuario": "Melissa de Jesus",
            "imgUsuario": "19414568706",
            "tipoPost": "PA",
            "imgPost": "3275601571",
            "interacoes": 15,
            "postAberto": false,
            "idPost": "12521153317",
            "comentarios": [
                {
                    "nomeUsuario": "Melissa de Jesus",
                    "imgUsuario": "19414568706",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "81378640733"
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado",
                    "idComentario": 4327754304
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado com view post",
                    "idComentario": 2708424800
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado com view post",
                    "idComentario": 581671448
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado ",
                    "idComentario": 8131258019
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado com view post",
                    "idComentario": 7231379038
                }
            ]
        },
        {
            "nomeUsuario": "Nikolas Alencar",
            "imgUsuario": "1123456789",
            "tipoPost": "",
            "imgPost": "36876752071",
            "comentarios": [
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "document",
                    "idComentario": 6578599529
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "document",
                    "idComentario": 4609214609
                }
            ],
            "interacoes": 0,
            "postAberto": false,
            "idPost": "682911032"
        },
        {
            "nomeUsuario": "Juliana Costa",
            "imgUsuario": "30875503453",
            "tipoPost": "AL",
            "imgPost": "36876752071",
            "interacoes": 15,
            "comentarios": [
                {
                    "nomeUsuario": "Carol Santana",
                    "imgUsuario": "97825793762",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "96697105109"
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado",
                    "idComentario": 5885441268
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado",
                    "idComentario": 2590062500
                },
                {
                    "nomeUsuario": "Nikolas Alencar",
                    "imgUsuario": "1123456789",
                    "mensagemComentario": "Adicionei um comentário integrado",
                    "idComentario": 6635844096
                }
            ],
            "postAberto": false,
            "idPost": "7226245116"
        },
        {
            "nomeUsuario": "Melissa de Jesus",
            "imgUsuario": "19414568706",
            "tipoPost": "PA",
            "imgPost": "3275601571",
            "interacoes": 15,
            "idPost": "12521153317",
            "comentarios": [
                {
                    "nomeUsuario": "Melissa de Jesus",
                    "imgUsuario": "19414568706",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "81378640733"
                }
            ],
            "postAberto": false
        },
        {
            "nomeUsuario": "Rogério Silva",
            "imgUsuario": "21359467999",
            "tipoPost": "TR",
            "imgPost": "65168959433",
            "interacoes": 15,
            "idPost": "26351834033",
            "comentarios": [
                {
                    "nomeUsuario": "Rogério Silva",
                    "imgUsuario": "21359467999",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "41163584167"
                }
            ],
            "postAberto": false
        },
        {
            "nomeUsuario": "Luis Rodolfo",
            "imgUsuario": "90370163449",
            "tipoPost": "AC",
            "imgPost": "46576169248",
            "interacoes": 15,
            "idPost": "43612242740",
            "comentarios": [
                {
                    "nomeUsuario": "Juliana Costa",
                    "imgUsuario": "30875503453",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "6455766222"
                }
            ],
            "postAberto": false
        },
        {
            "nomeUsuario": "Carol Santana",
            "imgUsuario": "97825793762",
            "tipoPost": "DE",
            "imgPost": "9803217144",
            "interacoes": 15,
            "idPost": "49606826452",
            "comentarios": [
                {
                    "nomeUsuario": "Luis Rodolfo",
                    "imgUsuario": "90370163449",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "35085974330"
                }
            ],
            "postAberto": false
        },
        {
            "nomeUsuario": "Nikolas Alencar",
            "tipoPost": "",
            "comentarios": [],
            "interacoes": 0,
            "postAberto": false,
            "imgUsuario": "1123456789",
            "imgPost": "36876752071",
            "idPost": "682911032"
        },
        {
            "nomeUsuario": "Juliana Costa",
            "imgUsuario": "30875503453",
            "tipoPost": "AL",
            "imgPost": "36876752071",
            "interacoes": 15,
            "idPost": "7226245116",
            "comentarios": [
                {
                    "nomeUsuario": "Carol Santana",
                    "imgUsuario": "97825793762",
                    "mensagemComentario": "Adicionei um comentário para testar",
                    "idComentario": "96697105109"
                }
            ],
            "postAberto": false
        }
    ]
}