const API_BASE_URL = "https://sistemadecontrolefinanceirobackend-production-8b75.up.railway.app/api/metas";

export const adicionarMeta = async (novaMeta) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(novaMeta),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Erro ao adicionar meta");
    }

    return data.meta;
  } catch (error) {
    throw error;
  }
};

export const listarMetasPorUsuario = async (idUsuario) => {
  let API_URL = `${API_BASE_URL}/usuario/${idUsuario}`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Erro ao buscar metas");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const atualizarStatus = async (id_meta, novoStatus) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${id_meta}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Erro ao atualizar status");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
