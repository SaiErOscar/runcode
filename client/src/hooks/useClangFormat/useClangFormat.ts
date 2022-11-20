import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { CodeType } from '~utils/codeType';
import ProcessManager from './process-manager';

interface Props {
  onCodeFormatDone(result: string): void;
}

let clangFormatInstance = new ProcessManager('clang-format', 'clang-format');

clangFormatInstance.start();

function useClangFormat({
  onCodeFormatDone,
}: Props): [
  boolean,
  ({ type, code }: { code: string; type: CodeType }) => void
] {
  const [clangFormat, setClangFormat] =
    useState<ProcessManager>(clangFormatInstance);

  const clangFormatRef = useRef<ProcessManager>();

  useEffect(() => {
    clangFormatInstance.workerReady = () => {
      setClangFormat(clangFormatInstance);
    };

    // @ts-ignore
    clangFormatInstance.workerFormatDone = (args) => {
      onCodeFormatDone(args?.result);
    };

    clangFormatRef.current = clangFormat;
  }, []);

  const format = ({ type, code }: { code: string; type: CodeType }) => {
    if (type === CodeType.nodejs) {
      if (window.prettier && window.prettierPlugins) {
        try {
          const formatCode = window.prettier.format(code, {
            parser: 'babel',
            plugins: window.prettierPlugins,
            singleQuote: true,
            tabWidth: 4,
          });
          onCodeFormatDone(formatCode);
        } catch (error: any) {
          console.log('js format error', error.message);
        }
      }
    } else if (
      [CodeType.c, CodeType.cpp, CodeType.java, CodeType.dotnet].includes(type)
    ) {
      clangFormat?.worker?.postMessage({
        function: 'format',
        code,
      });
    }
  };

  const isReady = !!clangFormat;

  return [isReady, format];
}

export default useClangFormat;
