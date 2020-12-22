exports.getTree = (data) => {
    //let types = getType(buffer);

    let array = resetArray(data);
    //创建根节点
    let root = [];
    let index = 0;
    while (array[index].type == 1) {
        //获得该叶子节点里面的全部节点
        let leaf = array[index];
        let ob = createLeaf(leaf, array);
        //把当前的叶子节点添加到根节点
        root.push(ob)
        index++;
    }

    return root;
}

/**
 * 对进来的数组按照type值从小到大进行排序
 */
const resetArray = (array) => {
    array.sort(function (a, b) { return a.type - b.type });
    return array;
}


const createLeaf = (dom, array) => {
    //创建叶子节点
    let leaf = {};
    leaf.title = dom.title;
    leaf.key = dom.key2;
    leaf.id = dom.id;
    leaf.type = dom.type;
    for (let i = 0; i < array.length; i++) {
        if (leaf.id == array[i].pid) {
            if (typeof (leaf.children) == 'undefined')
                leaf.children = [];
            let buffer = createLeaf(array[i], array);
            leaf.children.push(buffer);
        }
    }
    return leaf;
}

const findPid = (pid, array) => {
    for (let i = 0; i < array; i++) {
        if (!array[i].over && pid == array[i].pid) {
            array[i].over = true;
            return array[i];
        }
    }
    return null;

}