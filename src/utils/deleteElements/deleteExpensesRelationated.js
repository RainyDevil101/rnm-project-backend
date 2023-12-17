import { Expense } from "../../models/index.js";

export const deleteExpensesRelationated = async ({ id }) => {

  try {
    // Obtener todos los gastos relacionados con la cuenta
    const expenses = await Expense.findAll({
      where: {
        account_id: id,
        status: true,
      },
    });

    // Eliminar cada gasto relacionado
    const deletionPromises = expenses.map(async (expense) => {

      // Eliminar el gasto
      await expense.destroy();
    });

    // Esperar a que se completen todas las eliminaciones
    await Promise.all(deletionPromises);

    // Devolver un mensaje o indicador de éxito
    return { success: true, message: 'Related expenses deleted successfully' };

  } catch (error) {
    console.error(error);
    // Devolver un objeto con información sobre el error
    return { error: true, message: 'Error deleting related expenses' };
  };

};