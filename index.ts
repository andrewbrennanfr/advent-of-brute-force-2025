const [, , input = "00", output = "00"] = Bun.argv

;[...new Bun.Glob("*").scanSync(`src/${input}/`)].forEach((file) =>
    Bun.file(`src/${input}/${file}`)
        .text()
        .then((text) => text.replaceAll(`@/${input}`, `@/${output}`))
        .then((text) => text.replaceAll(`"${input}"`, `"${output}"`))
        .then((text) => text.replaceAll(".skip", ""))
        .then((text) => Bun.write(`src/${output}/${file}`, text)),
)
