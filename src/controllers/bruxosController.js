import dados from "./../models/dados.js"

const { bruxos } = dados;

const getAllBruxos = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Lista de bruxos convocada com sucesso",
        total: bruxos.length,
        bruxos: bruxos
    });
};

const getBruxoById = (req, res) => {
    const id = parseInt(req.params.id)

    const bruxo = bruxos.find(b => b.id === id);

    if(bruxo) {
    res.status(200).json({
        total:bruxo.length,
        bruxo:bruxo
    })
}
    if( !nome ) {
    return res.status(400).json({
        sucess: false,
        message: "Nome é obrigatorios"
    });
}

    res.status(404).json({
        success: false,
        message: "Nenhum bruxo foi encontrado no Beco Diagonal",
        error: "WIZARD_NOT_FOUND",
        suggestions: "Verifique registro do bruxo com esse ID"
    })
}
const creatBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body
    const nomeExistente =  bruxos.find(b => b.nome.toLowerCase() === nome.toLowerCase())

    if( !nome ) {
        return res.status(400).json({
            sucess: false,
            message: "Nome é obrigatorios"
        });
    }

    if (nomeExistente) {
        res.status(409).json({
            success: false,
            message: "Já existe um bruxo com esse nome!",
            error: "WIZARD_ALREADY_EXIST",
            suggestions: 
            "Verifique lista de bruxos"
        })
    }
    const novoBruxo = {
        id : bruxos.length + 1,
        nome: nome,
        casa: casa,
        anoNascimento: parseInt(anoNascimento),
        especialidade: especialidade || "em desenvolvimento",
        nivelMagia: nivelMagia,
        ativo: ativo
    }
    bruxos.push(novoBruxo);

    if(novoBruxo) { 
    res.status(201).json({
        sucess: true,
        message: "Novo bruxo matriculado em Hogwarts",
        bruxo: novoBruxo
    });
}
    res.status(400).json({
        success: false, 
        message: "Feitiço mal executado! Verifique os ingredientes",
        error: "VALIDATION_ERROR",
        suggestions: 
        "Verifique se os dados necessários foram adicionados"
    })


}
const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);

    const {  nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body; 

    const casasLista = ["Grifinoria", "Lufa-Lufa", "Corvinal", "Sonserina"]


    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido"
        })
    }

    const bruxoExiste = bruxos.find(bruxo => bruxo.id === id);

    if (!bruxoExiste) {
        res.status(404).json({
            success: false,
            message: "Não é possivel atualizar atualizar o que não existe",
            error: "WIZARD_NOT_FOUND",
            suggestions: "Verifique a existência do bruxo antes de atualizar"
        })
    }


    if(casa) {
        if(!casasLista.includes(casa.toLowerCase())) {
           return res.status(400).json({
                success: false,
                message: `O campo 'casa' deve ser uma das opções: ${casasLista(", ")}!`
            })
        }
    }

    const bruxoAtualizado = bruxos.map(bruxo => {
        return bruxo.id === id
            ? {
                ...bruxo,
                ...(nome      && { nome }),
                ...(casa    && { casa }),
                ...(anoNascimento  && { anoNascimento }),
                ...(especialidade      && { especialidade }),
                ...(nivelMagia      && { nivelMagia }),
                ...(ativo && { ativo })
            }
            : bruxo;
    });
    
    bruxos.splice(0, bruxos.length, ...bruxoAtualizado);

    const bruxoNovo = bruxos.find(bruxo => bruxo.id === id);

    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso",
        bruxo: bruxoNovo
    })

}
const deleteBruxo = ( req, res) => {
    console.log("Passou por aqui")
    const id = parseInt(req.params.id);

    console.log(id);

    if(isNaN(id)){
        return res.status(400).json ({
            sucess: false,
            message: " O ID deve ser valido"
        })
    }
    const bruxoParaRemover = bruxos.find(b => b.id === id);
    if(!bruxoParaRemover) {
        return res.status(404).json ({
            sucess: false,
            message: `O bruxo com o ID: ${id} não existe`
        })
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

    bruxos.splice(0, bruxos.length, ... bruxosFiltrados);

    res.status(200).json ({
        sucess: true,
        message:  "Bruxo expulso de Hogwarts com sucesso!"
    })

    
}

export {getAllBruxos, getBruxoById, creatBruxo, updateBruxo, deleteBruxo}