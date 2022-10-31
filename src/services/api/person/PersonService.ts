// import { NumericDictionary } from "lodash";
import { Environment } from "../../../environment/Envorinment";
import { Api } from "../axios-config/AxiosConfig";

export interface IPerson {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  cpf: string;
  phone: number;
  genre: string;
  text: string;
 
}
interface IDetailsPerson {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  cpf: string;
  phone: number;
  genre: string;
  text: string;
  
}

type TPersonCount = {
  data: IPerson[];
  totalCount: number;
};
const getAll = async (page = 1, filter = ""): Promise<TPersonCount | Error> => {
  try {
    const urlRelative = `/person?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
    const { data, headers } = await Api.get(urlRelative);
    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("Erro ao listar ");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar "
    );
  }
};

const create = async (
  dados: Omit<IDetailsPerson, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailsPerson>("/person", dados);
    if (data) {
      return data.id;
    }

    return new Error("Erro de criar usuario ");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar registro"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/person/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao deletar registro"
    );
  }
};

export const PersonService = {
  getAll,
  create,
  deleteById,
};
