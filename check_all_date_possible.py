
days = range(1,32)
months = range(1,13)
years = range(0,100)

dates = {}
for year in years:
    for month in months:
        for day in days:
            dates[f"{str(day).zfill(2)}{str(month).zfill(2)}{str(year).zfill(2)}"] = -1

non_dates_count = 0
character_count = 5
found_count = 0
last_found = ""

with open("digits.txt", "r") as file:
    date_str = file.read(6)

    while len(date_str) == 6:
        if date_str in dates and dates[date_str] < 0:
            dates[date_str] = character_count-6
            found_count += 1
            last_found = date_str
        else:
            non_dates_count += 1

        date_str = date_str[1:] + file.read(1)
        character_count += 1

found_dates = [key for (key, value) in dates.items() if value >= 0]
missing_dates = [key for (key, value) in dates.items() if value < 0]

print(f"Among the first {character_count} digits of Pi:\n")
print(f"Valid dates found: {len(found_dates)} ({100*len(found_dates)/len(dates)}%):")
print("\n".join([" - " + date for date in found_dates[:20]]))
print(" - ...")
print(f"Dates missing: {len(missing_dates)} ({100*len(missing_dates)/len(dates)}%):")
print("\n".join([" - " + date for date in missing_dates[:20]]))
print(" - ...")
print(f"Last date found at index {dates[last_found]}: {last_found}")


# Digits-billion.txt
# Among the first 10428747 digits of Pi:
# Valid dates found: 37200 (100.0%)
#Last date found at index 10428740: 120154

# Digits.txt
