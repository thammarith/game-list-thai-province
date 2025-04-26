import { createSignal, type Component } from 'solid-js';
// @ts-ignore
import Thailand from '@svg-maps/thailand';

type Props = {
    guessedProvinces: string[];
}

export const Map: Component<Props> = (props) => {
    return (
        <svg height="100%" xmlns="http://www.w3.org/2000/svg" viewBox={Thailand.viewBox}>
            {Thailand.locations.filter((l: any) => l.id !== 'lksg').map((location: any) => {
                return (
                    <path
                        id={location.id}
                        d={location.path}
                        classList={{
                            'fill-blue-500': props.guessedProvinces.includes(location.name)
                        }}
                        // @ts-ignore
                        key={location.id}
                    />
                );
            })}
        </svg>
    );
};
