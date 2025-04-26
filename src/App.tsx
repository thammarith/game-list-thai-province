import { createSignal, type Component } from 'solid-js';
import { Map } from './components/Map';
import { allProvinces, Province } from './data/provinces';

const App: Component = () => {
    let inputRef = undefined as unknown as HTMLInputElement;

    const [provinces, setProvinces] = createSignal<Province[]>([...allProvinces]);
    const [message, setMessage] = createSignal<string>();

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        if (!inputRef) return;

        setMessage(undefined);
        const guess = inputRef.value;

        const foundProvince = allProvinces.filter((p) => p.th === guess || guess.includes('กรุงเทพ'));
        const isAlreadyFound = provinces().filter((p) => p.th === guess).length > 0;
        inputRef.value = '';

        if (!foundProvince.length) {
            setMessage('ไม่พบจังหวัดนี้ สะกดถูกไหมน้าาา?');
            return;
        }

        if (isAlreadyFound) {
            setMessage('ใส่จังหวัดนี้แล้ว');
            return;
        }

        setProvinces((previousProvinces) => [...previousProvinces, ...foundProvince]);
    };

    return (
        <>
            <main class="w-dvw h-dvh grid grid-cols-2 grid-flow-row gap-4">
                <header class="col-span-2">
                    <form onsubmit={onSubmit}>
                        <label>
                            จังหวัด: &nbsp;
                            <input name="guess" ref={inputRef} type="text" />
                        </label>
                        <div>{message()}</div>
                    </form>
                </header>
                <aside class="row-start-2 flex justify-center">
                    <Map guessedProvinces={provinces().map((p) => p.en)} />
                </aside>
                <section class="row-start-2 overflow-y-scroll">
                    <ol class="list-decimal list-inside">
                        {provinces().map((p) => (
                            <li>{p.th}</li>
                        ))}
                    </ol>
                </section>
                <footer class="col-span-2">4</footer>
            </main>
        </>
    );
};

export default App;
