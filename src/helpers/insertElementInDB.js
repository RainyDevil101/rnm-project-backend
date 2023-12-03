export const insertElementInDB = async (element) => {

  try {
    const newElement = await element.save().then(function (newElement) {
      return newElement;
    });

    return { newElement };

  } catch (error) {
    console.error(error);
    return (error);
  };

};