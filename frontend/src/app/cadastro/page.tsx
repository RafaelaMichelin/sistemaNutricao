'use client';

import { useState } from 'react';

type TipoUsuario = 'paciente' | 'nutricionista';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    cpf: '',
    tipoDeUsuario: 'paciente' as TipoUsuario,
    altura: '',
    dataNascimento: '',
    objetivo: '',
    crn: '',
    especialidade: '',
    disponibilidade: 'disponivel' as string,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        altura: formData.tipoDeUsuario === 'paciente' ? parseFloat(formData.altura) : undefined,
        dataNascimento: formData.tipoDeUsuario === 'paciente' ? formData.dataNascimento : undefined,
        objetivo: formData.tipoDeUsuario === 'paciente' ? formData.objetivo : undefined,
        crn: formData.tipoDeUsuario === 'nutricionista' ? formData.crn : undefined,
        especialidade: formData.tipoDeUsuario === 'nutricionista' ? formData.especialidade : undefined,
        disponibilidade: formData.tipoDeUsuario === 'nutricionista' ? formData.disponibilidade : undefined,
      };
      const response = await fetch('http://localhost:3000/usuario/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Cadastro successful!');
        // Redirect to login
      } else {
        const errData = await response.json();
        setError(errData.message || 'Cadastro failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Cadastro</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          name="cpf"
          type="text"
          placeholder="CPF (11 dígitos)"
          value={formData.cpf}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          name="tipoDeUsuario"
          value={formData.tipoDeUsuario}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="paciente">Paciente</option>
          <option value="nutricionista">Nutricionista</option>
        </select>
        {formData.tipoDeUsuario === 'paciente' && (
          <>
            <input
              name="altura"
              type="number"
              step="0.01"
              placeholder="Altura (m)"
              value={formData.altura}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              name="objetivo"
              type="text"
              placeholder="Objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </>
        )}
        {formData.tipoDeUsuario === 'nutricionista' && (
          <>
            <input
              name="crn"
              type="text"
              placeholder="CRN"
              value={formData.crn}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              name="especialidade"
              type="text"
              placeholder="Especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <select
              name="disponibilidade"
              value={formData.disponibilidade}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            >
              <option value="disponivel">Disponível</option>
              <option value="indisponivel">Indisponível</option>
            </select>
          </>
        )}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}