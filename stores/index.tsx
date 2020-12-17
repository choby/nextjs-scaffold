import { configure } from "mobx";
import { inject as mobxInject, IWrappedComponent, Provider } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import React from "react";


configure({
    enforceActions: "always",// 开启严格模式, state值只允许 通过action修改
});

// 全局store对象, 索引名即为状态名
const stores = {

};

const StoreContext = React.createContext(stores);
StoreContext.displayName = "StoreContext";

// 使用React Context和mobx Provider双层包裹, 获取状态支持hooks和修饰器两种写法
const StoreProvider = ({ children }: { children: React.ReactElement | React.ReactElement[]; }) => {
    return <StoreContext.Provider value={stores}>
        <Provider {...stores}>{children}</Provider>
    </StoreContext.Provider>;
};

// 参数可用值已经过类型推断, 调用时指定可选状态名即可
const useStore = <N extends keyof typeof stores>(name: N) => {
    const store = React.useContext(StoreContext)[name];
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};

// 为mobx的inject方法指定别名, 并重定义类型, 参数可用值经过类型推断
const inject: <N extends keyof typeof stores>(...stores: Array<N>) =>
    <T extends IReactComponent<any>>(target: T) => T & (T extends IReactComponent<infer P> ? IWrappedComponent<P> : never)
    = mobxInject;


export { StoreProvider, useStore, inject, stores };

