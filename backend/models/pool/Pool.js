// models/Pool.js
import { create, readAll, read, update, deleteRecord } from '../../config/database.js';

const listarPool = async () => {
  try {
    return await readAll('pool');
  } catch (error) {
    console.error('Erro ao listar os pools:', error);
    throw error;
  }
};


const obterPoolPorId = async (id) => {
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido. Deve ser um número positivo.');
    }
    const where = `id = ?`; // Define a condição
    const result = await read('pool', where, [id]); // Passa a tabela, a condição e os parâmetros
    return result;
  } catch (error) {
    console.error('Erro ao obter o pool por ID:', error);
    throw error;
  }
};

const criarPool = async (PoolData) => {
  try {
    await create('pool', PoolData);
    return ("Pool criado com sucesso!")
  } catch (error) {
    console.error('Erro ao criar pool:', error);
    throw error;
  }
};

const atualizarPool = async (id, ChamadoData) => {
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error('ID inválido. Deve ser um número positivo.');
    }
    const fields = Object.keys(ChamadoData).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(ChamadoData);
    const query = `UPDATE chamado SET ${fields} WHERE id = ?`;
    const result = update(query, [...values, id]);
    return result.affectedRows
  } catch (error) {
    console.error('Erro ao atualizar o chamado:', error);
    throw error;
  }
};



const excluirPool = async (id) => {
  try {
  return await deleteRecord('pool', `id = ${id}`)
  } catch (error) {
    console.error('Erro ao excluir o pool', error)
  }
};

export { listarPool, obterPoolPorId, criarPool, atualizarPool, excluirPool };