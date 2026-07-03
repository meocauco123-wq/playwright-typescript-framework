const getName = async () => {
    return 'Phuong';
};

const run = async () => {

    const result = await getName();

    console.log(result);
};

run();