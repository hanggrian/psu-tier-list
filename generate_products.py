# TODO need manual fix:
#   - `bitfenix_fury`: wattage fail to split
#   - `sama_see_fsp`: residual row from Quanhan mistakenly captured

from json import dump
from os.path import isfile
from re import findall, sub

from colorama import Fore, Style
from pandas import read_csv, notna

EFFICIENCY = {
    'G': '80+ Gold',
    'P': '80+ Platinum',
    'B': '80+ Bronze',
    'S': '80+ Silver',
    'T': '80+ Titanium',
    'W': '80+ White',
    'N': 'N/A',
}
OUTPUT_FILE = 'src/products.json'

if __name__ == '__main__':
    result = []
    current_brand = ''
    current_model = ''

    print(f'{Fore.YELLOW}Reading CSV...{Style.RESET_ALL}')
    for _, row in read_csv('cultist_rev17.csv', header=None, skiprows=1).iterrows():
        if notna(row[0]):
            current_brand = str(row[0]).strip()
            print(f'- {current_brand}')

        if notna(row[1]):
            current_model = str(row[1]).strip()
            if not current_model:
                continue
            current_model_lower = current_model.lower()
            if 'see ' in current_model_lower or 'fill me ' in current_model_lower:
                continue
            print(f'  - {current_model}')

        model_name = f'{current_model} {str(row[2]).strip()}' if notna(row[2]) else current_model
        print(f'    - {model_name}')

        raw_wattage = str(row[7]) if notna(row[7]) else ''
        eff_code = str(row[4]).strip() if notna(row[4]) else ''
        mod_code = str(row[13]).strip().lower() if notna(row[13]) else ''

        name = f'{current_brand} {model_name}'.strip()
        image = sub(r'[^a-zA-Z0-9]+', '_', f'{current_brand}_{current_model}').strip('_').lower()
        if isfile(f'public/images/{image}.png'):
            image += '.png'
        elif isfile(f'public/images/{image}.jpg'):
            image += '.jpg'
        else:
            image += '.webp'
        if 'full' in mod_code:
            modular = 'Fully Modular'
        elif 'semi' in mod_code:
            modular = 'Semi Modular'
        else:
            modular = 'Non-Modular'

        result.append({
            'image': image,
            'name': name,
            'year': str(row[11]).strip() if notna(row[11]) else '',
            'tier': str(row[6]).strip() if notna(row[6]) else '',
            'wattage':
                [int(w) for w in findall(r'(\d+)', raw_wattage)]
                if 'X' not in raw_wattage
                else [],
            'efficiency': EFFICIENCY.get(eff_code, eff_code),
            'modular': modular,
        })

    with open(OUTPUT_FILE, 'w', encoding='UTF-8') as file:
        dump(result, file, indent=2)
    print(f'{Fore.GREEN}Done.{Style.RESET_ALL}')

    print()
    print('Goodbye!')
