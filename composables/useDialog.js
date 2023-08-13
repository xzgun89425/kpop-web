const dialogRef = ref(null);
export const dialogData = reactive({
    title: "",
    content: "",
    confirm: {
        btnName: "",
        onComplete: () => {

        },
    },
    cancel: {
        btnName: "",
        onComplete: () => {

        },
    },
});

export const useDialog = () => {
    const open = (option) => {
        if (option) {
            dialogData.title = option.title || '預設Title';
            dialogData.content = option.content || '預設Content';
            dialogData.confirm = option.confirm;
            dialogData.cancel = option.cancel;

            dialogData.confirm.btnName = option.confirm.btnName || "確認";
            dialogData.cancel.btnName = option.cancel.btnName || "取消";
        }
        dialogRef.value.showModal();
    }
    const close = (type) => {
        if (dialogData[type].onComplete) {
            dialogData[type].onComplete();
        }
        dialogRef.value.close();
    }

    onMounted(() => {
        dialogRef.value = document.querySelector("#dialog")
    })

    return { open, close }
}