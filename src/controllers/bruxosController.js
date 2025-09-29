import dados from "./../models/dados.js"

const { bruxos } = dados;

const getAllBruxos = (req, res) => {
    res.status(200).json({
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

    res.status(404).json({
        success: false,
        message: "Nenhum bruxo foi encontrado no Beco Diagonal",
        error: "WIZARD_NOT_FOUND",
        suggestions: "Verifique registro do bruxo com esse ID"
    })
}
const creatBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body

    if( !nome || !casa ) {
        return res.status(400).json({
            sucess: false,
            message: "Nome e casa são obrigatorios"
        });
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

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionado",
        bruxo: novoBruxo
    });
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
        message:  `O bruxo ${id} foi removido com sucesso!`
    })
}
 
export {getAllBruxos, getBruxoById, creatBruxo, deleteBruxo};

